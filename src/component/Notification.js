import { Container } from 'react-bootstrap';
import Layout from './partials/Layout'


export const Notification = () => {
 
  return (
    <Layout>
      <Container fluid className="p-5">
        <h1>Notifications</h1>
        <div class="alert alert-info alert-dismissible fade show" role="alert">
          <strong>Navigate</strong> through the platform with the sections below.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div className="row">

        </div>
      </Container>
    </Layout>
  );
};
