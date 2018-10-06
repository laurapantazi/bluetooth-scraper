# Bluetooth Scraping
This project implements a bluetooth scraper in the `https://www/bluetooth.com`, in order to extract the standard services and characteristics.

## Prerequisites
  * Node.js - Download and install Node.js

## Functionality Overview

  * `/services` - Get all the standard services, and generate a json file that contains them
  * `/characteristics` - Get all the standard characteristis, and generate a json file that contains them
  * `/services/:uuid` - Get the service name with the specific uuid
  	Example `/services/0x1809`
  * `/characteristics/:uuid` - Get the characteristic name with the specific uuid
  	Example `/characteristics/0x2A37`

## Getting Started

1. Clone or download repository
2. Install the dependencies
```
npm install
```
3. Start the server
```
npm start
```
4. Navigate to `http://localhost:4000/`