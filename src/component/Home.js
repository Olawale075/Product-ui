/** @format */
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import React from 'react';
import TableComponent from '../element/TableComponent';

export const Home = () => {
  const btnStyle = {
    float: 'right',
    backgroundColor: '#2a3f54',
  };
  return (
    <Container fluid>
      <div className="container">
        <h2 className="text-center">View Message Configuration</h2>
        <br />
        <br />
        <TableComponent />

        <Button
          style={btnStyle}
          className="content-end"
          variant="secondary"
          href="/MessageConfiguration"
        >
          Add New Message Configuration
        </Button>
      </div>
    </Container>
  );
};
