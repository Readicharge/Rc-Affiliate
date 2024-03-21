import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Button } from './ui/button';

const BusinessCardGenerator = ({ data, backgroundOption }: any) => {
  const cardRef = useRef(null);

  const downloadBusinessCard = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'business_card.png';
        link.click();
      });
    }
  };

  const backgroundImage = backgroundOption === 'stylish' ? 'url("https://readicharge.com/wp-content/uploads/2023/03/banner3.jpg")' : 'none';

  return (
    <div
      className="business-card  max-w-lg mx-auto p-6 rounded-md shadow-lg"
      ref={cardRef}
      
    >
      <div className="card-content"style={{
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'black',
        borderRadius: '10px',
        padding:10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      }}>
        <h2 className="text-xl font-semibold mb-2">{data.userBasedData.firstname}</h2>
        <p className="text-sm mb-1">ReadiCharge LLC</p>
        <p className="text-sm mb-1">{data.userBasedData.email}</p>
        <p className="text-sm mb-1">Phone: {data.userBasedData.contactno}</p>
      </div>

      <Button
        variant="link"
        onClick={downloadBusinessCard}
        className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        style={{
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        Download Business Card
      </Button>
    </div>
  );
};

export default BusinessCardGenerator;
