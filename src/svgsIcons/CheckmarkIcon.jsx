import React from 'react';

const CheckmarkIcon1 = ({ width = 24, height = 24, fill = "black" }) => {
  return (
    <svg
      id="Icons"
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
    >
      <path d="M23.817 36.153c-.313.336-.815.413-1.216.192l-18.208-10.078c-.274-.152-.539-.216-.785-.216-.489 0-.903.252-1.175.562-.41.467-.679 1.296-.088 2.096l20.845 28.205c.546.738 1.384 1.133 2.28 1.081.907-.052 1.693-.539 2.154-1.338l30.124-52.143c.552-.955.105-1.769-.444-2.176-.548-.405-1.389-.566-2.104.199l-31.383 33.617z" />
    </svg>
  );
};

export  {CheckmarkIcon1};
