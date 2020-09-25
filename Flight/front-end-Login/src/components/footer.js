import React from 'react';
import styled from 'styled-components'

const Footer = () => {
    return (
        <FooterContainer>
            <span style={
                 {color:"#fff" ,top:"0.8rem",position:"relative"
            }}>
                &copy;{new Date().getFullYear()}All rights reserved.Flight Reservation System
            </span>
        </FooterContainer>
    )
}

export default Footer

const FooterContainer= styled.footer`
 background:#343a40;
 opacity:0.8;
 height:3rem;
 width:100%;
 margin-bottom:0;
 margin-top:560px;



`;