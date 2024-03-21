import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Cluster, hierarchy } from '@visx/hierarchy';
import { HierarchyPointNode, HierarchyPointLink } from '@visx/hierarchy/lib/types';
import { LinkVertical } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import PageUpperSide from './PageUpperSide';
import PageMiddleSide from './PageMiddleSode';
import PageBottomSide from './PageBottomSide';

const citrus = '#ddf163';
const white = '#ffffff';
export const green = '#96d232';
const aqua = '#96d235';
const merlinsbeard = '#f7f7f3';
export const background = 'transparent';

interface NodeShape {
  name: string;
  children?: NodeShape[];
}

const clusterData: NodeShape = {
  name: '$',
  children: [
    {
      name: 'B',
    },
    {
      name: 'X',
      children: [
        {
          name: 'Z',
        },
      ],
    },
  ],
};

function RootNode({ node }: { node: HierarchyPointNode<NodeShape> }) {
  const width = 150;
  const height = 60;
  const centerX = -width / 2;
  const centerY = -height / 2;
 

  return (
    <Group top={node.y} left={node.x}>
      <rect width={400} height={height} y={centerY} x={centerX-120} fill="url('#top')"  />
      <text
        dy=".33em"
        fontSize={30}
        fontFamily="Arial"
        textAnchor="middle"
        color='#fff'
        style={{ pointerEvents: 'none' }}
        fill={"#06061e"}
      >
        Sales Rules Setup
      </text>
    </Group>
  );
}

function Node({ node }: { node: HierarchyPointNode<NodeShape> }) {
  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  if (isRoot) return <RootNode node={node} />;


  

  return (
    <Group top={node.y} left={node.x}>
      <foreignObject width={400} height="400" style={{ translate: -200 }}>
      
        {node?.data.name === "X" && (  <PageUpperSide />)}
        {node?.data.name === "B" && (  <PageMiddleSide />)}
        {node?.data.name === "Z" && (  <PageBottomSide/>)}
      </foreignObject>
    </Group>
  );
}

const defaultMargin = { top: 40, left: 0, right: 0, bottom: 40 };

export type DendrogramProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function TreeGraph({ width, height, margin = defaultMargin }: DendrogramProps) {
  const data = useMemo(() => hierarchy<NodeShape>(clusterData), []);
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;


  

  return (
    <div style={{ overflowY: 'scroll' }} className='h-full'>
      <svg width={width} height={height+300}>
        <LinearGradient id="top" from={green} to={aqua} />
        <rect width={width} height={height} rx={14} fill={background} />
        <Cluster<NodeShape> root={data} size={[xMax, yMax]}>
          {(cluster) => (
            <Group top={margin.top} left={margin.left}>
              {cluster.links().map((link, i) => (
                <LinkVertical<HierarchyPointLink<NodeShape>, HierarchyPointNode<NodeShape>>
                  key={`cluster-link-${i}`}
                  data={link}
                  stroke={merlinsbeard}
                  strokeWidth="1"
                  strokeOpacity={0.2}
                  fill="none"
                />
              ))}
              {cluster.descendants().map((node, i) => (
                <Node key={`cluster-node-${i}`} node={node} />
              ))}
            </Group>
          )}
        </Cluster>
      </svg>
    </div>
  );
}
