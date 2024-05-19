import React from 'react';

const PowerBIEmbed = () => {
  return (
    <div className="powerbi-container">
      <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
        <iframe
          title="ShopLInk"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          src="https://app.powerbi.com/reportEmbed?reportId=cb8a67cb-b9a7-4382-86a4-b71192156ac5&autoAuth=true&ctid=a1e3cc4f-47e2-4e32-a7a1-5b14136b160b"
          frameBorder="0"
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
};

export default PowerBIEmbed;
