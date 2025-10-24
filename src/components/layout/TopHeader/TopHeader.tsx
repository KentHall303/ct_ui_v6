import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface TopHeaderProps {
  whitelabelImage?: string;
  whitelabelAlt?: string;
  contactEmail?: string;
  contactPhone?: string;
  userAvatar?: string;
  userName?: string;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  whitelabelImage = "/rectangle.png",
  whitelabelAlt = "Company Logo",
  contactEmail = "Kent+timtim@clienttether.com",
  contactPhone = "9893685431",
  userAvatar = "/-avatar-.png",
  userName = "User"
}) => {
  return (
    <>
      <header className="top-header">
        <Container fluid className="h-100">
          <Row className="align-items-center h-100 gx-0">
            {/* Left side - Whitelabel */}
            <Col xs={6} md={6} className="top-header__whitelabel-area">
              <img 
                src={whitelabelImage}
                alt={whitelabelAlt}
                className="whitelabel-image"
              />
            </Col>
            
            {/* Right side - Contact Info */}
            <Col xs={6} md={6} className="top-header__contact-info">
              <div className="contact-details">
                <div className="email">{contactEmail}</div>
                <div className="phone">{contactPhone}</div>
              </div>
              <img 
                src={userAvatar}
                alt={userName}
                className="user-avatar"
              />
            </Col>
          </Row>
        </Container>
      </header>
      <div className="header-separator"></div>
    </>
  );
};