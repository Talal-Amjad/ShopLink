// BarcodeScanner.jsx

import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onScan }) => {
  const [scannerReady, setScannerReady] = useState(false);

  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner-container'),
        constraints: {
          width: 480,
          height: 320,
          facingMode: "environment"
        },
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      numOfWorkers: navigator.hardwareConcurrency || 4,
      decoder: {
        readers: ["ean_reader"]
      },
      locate: true
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
      setScannerReady(true);
    });

    Quagga.onDetected(data => {
      if (scannerReady) {
        onScan(data.codeResult.code);
      }
    });

    return () => {
      Quagga.stop();
    };
  }, [onScan, scannerReady]);

  return (
    <div id="scanner-container"></div>
  );
};

export default BarcodeScanner;
