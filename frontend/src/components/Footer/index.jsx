import React from 'react';

import { GoMarkGithub } from 'react-icons/go';
import { AiFillInstagram, AiFillLinkedin, AiOutlineInstagram } from 'react-icons/ai';

import './styles.css';

const Footer = () =>{

    const routes = {
        myGitHub: "https://github.com/herculesra",
        githubProject: "https://github.com/herculesra/ProjetoDevWeb",
        linkedin: "https://www.linkedin.com/in/h%C3%A9rcules-rodrigues-021333172/",
        instagram: "https://www.instagram.com/hercules_hra/",
    }

    return(
        <React.Fragment>
            <div className="container-footer">
                <a target='_blank' href={routes.myGitHub}>
                    <GoMarkGithub size={32} fill="#endregion"></GoMarkGithub>
                </a>

                <a target='_blank' href={routes.linkedin}>
                    <AiFillLinkedin size={32} fill="#endregion"></AiFillLinkedin>
                </a>

                <a target='_blank' href={routes.instagram}>
                    <AiOutlineInstagram size={32} fill="#endregion"></AiOutlineInstagram>
                </a>
            </div>
        </React.Fragment>
    );
}

export default Footer;