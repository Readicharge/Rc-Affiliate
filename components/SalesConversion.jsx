"use client"
import React from 'react';
import {AreaChart,Area,XAxis,YAxis,Tooltip,ResponsiveContainer} from 'recharts';

const sampleData = [
  {
    "year": 2011,
    "clicks": 400,
    "conversions": 44

  },
  {
    "year": 2012,
    "clicks": 233,
    "conversions": 12
  },
  {
    "year": 2013,
    "clicks": 875,
    "conversions": 232
  },
  {
    "year": 2014,
    "clicks": 1113,
    "conversions": 196
  },
  {
    "year": 2015,
    "clicks": 1594,
    "conversions": 124
  },
  {
    "year": 2016,
    "clicks": 1230,
    "conversions": 532
  },
  {
    "year": 2017,
    "clicks": 1233,
    "conversions": 123
  },
  {
    "year": 2018,
    "clicks": 3498,
    "conversions": 233
  },
  {
    "year": 2019,
    "clicks": 2344,
    "conversions": 255
  },
  {
    "year": 2020,
    "clicks": 2431,
    "conversions": 234
  }
];

const SalesGraph = () => {
  return (
   <>
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart width={730} height={250} data={sampleData} 
            margin={{top:10,right:30,left:0,bottom:0}}>
                <defs>
                    <linearGradient id='colorUv' x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor='#96d232' stopOpacity={0.8}/>
                           <stop offset="95%" stopColor='#96d232' stopOpacity={0}/>
                    </linearGradient>
                       <linearGradient id='colorPv' x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor='#f0dd5d' stopOpacity={0.8}/>
                           <stop offset="95%" stopColor='#f0dd5d' stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="year"/>
                <YAxis/>
                <Tooltip/>
                <Area type="monotone" dataKey="clicks" stroke='#96d232' fillOpacity={1} fill='url(#colorUv)'/>
                 <Area type="monotone" dataKey="conversions" stroke='#f0dd5d' fillOpacity={1} fill='url(#colorPv)'/>
            </AreaChart>
        </ResponsiveContainer>
   </>
  );
}

export default SalesGraph;
