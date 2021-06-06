import React, {useEffect, useState} from 'react';
import './App.css';
import { Button, Container } from 'semantic-ui-react';
import { Link } from "react-router-dom";

function HomePage() {
  
  return (
    <Container style={{ marginTop:200 }}>
        <div className="App">
            <Link to="/user">
                <Button>點餐系統</Button>
            </Link>
            
            <Link to="/store">
                <Button>店家系統</Button>
            </Link>
        </div>
    </Container>
  );
}

export default HomePage;
