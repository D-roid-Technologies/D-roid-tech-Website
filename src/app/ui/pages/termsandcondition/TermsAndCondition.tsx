// @ts-nocheck

import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './TermsAndCondition.css'

const TermsAndConditions: React.FunctionComponent = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: '#F9F9F9',
            }}
        >
            {/* Header */}
            <div
                style={{
                    backgroundColor: '#071D6A',
                    color: '#FFFFFF',
                    padding: '20px',
                    position: 'relative',
                }}
            >
                <a
                    href="/"
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Home
                </a>
                <h1 className='terms__heading'>
                    Terms and Conditions
                </h1>
            </div>

            {/* Main Content */}
            <div
                style={{
                    flex: '1',
                    backgroundColor: '#FFFFFF',
                    padding: '40px',
                    overflowY: 'auto',
                }}
            >
                <h2 style={{ fontSize: '24px', color: '#071D6A' }}>Introduction</h2>
                <p className='terms__paragraph'>
                    Welcome to D'roid. These terms and conditions outline the rules and regulations for the use of D'roid's services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use D'roid if you do not agree to all of the terms and conditions stated on this page.
                </p>

                <h2 style={{ fontSize: '24px', color: '#071D6A' }}>Use of Our Services</h2>
                <p className='terms__paragraph'>
                    The services provided by D'roid are for the purpose of connecting developers, organisations, and staff in a collaborative environment. By using the services, you agree to follow the rules of conduct that we establish. Failure to do so may result in termination of your account.
                </p>

                <h2 style={{ fontSize: '24px', color: '#071D6A' }}>Account Creation</h2>
                <p className='terms__paragraph'>
                    To use some of our services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must notify us immediately if you suspect any unauthorized access to your account.
                </p>

                <h2 style={{ fontSize: '24px', color: '#071D6A' }}>User Conduct</h2>
                <p className='terms__paragraph'>
                    You agree not to use the services in any way that could damage, disable, overburden, or impair the services. You also agree not to engage in any conduct that could harm other users or violate any laws.
                </p>

                <h2 style={{ fontSize: '24px', color: '#071D6A' }}>Privacy Policy</h2>
                <p className='terms__paragraph'>
                    Please refer to our <a href="/privacy-policy" style={{ color: '#479BE8' }}>Privacy Policy</a> for details on how we collect, store, and protect your personal information.
                </p>

                <h2 style={{ fontSize: '24px', color: '#071D6A' }}>Intellectual Property</h2>
                <p className='terms__paragraph'>
                    All content provided through D'roid, including but not limited to text, graphics, logos, images, and software, is the property of D'roid or its licensors and is protected by copyright laws. You agree not to use, reproduce, or distribute any of the content without our prior written consent.
                </p>

                <h2 style={{ fontSize: '24px', color: '#071D6A' }}>Limitation of Liability</h2>
                <p className='terms__paragraph'>
                    D'roid shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of our services or the inability to use the services. We do not guarantee that our services will be uninterrupted or error-free.
                </p>

                <h2 style={{ fontSize: '24px', color: '#071D6A' }}>Termination</h2>
                <p className='terms__paragraph'>
                    We reserve the right to terminate or suspend your account at any time if you violate these terms and conditions. Upon termination, you must stop using our services immediately.
                </p>

                <h2 style={{ fontSize: '24px', color: '#071D6A' }}>Changes to the Terms</h2>
                <p className='terms__paragraph'>
                    D'roid reserves the right to modify or replace these terms at any time. We will notify you of any significant changes by updating the "Last Updated" date at the top of this page.
                </p>

                <h2 style={{ fontSize: '24px', color: '#071D6A' }}>Contact Us</h2>
                <p className='terms__paragraph'>
                    If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:support@droid.com" style={{ color: '#479BE8' }}>support@droid.com</a>.
                </p>
            </div>
        </div>
    );
};

export default TermsAndConditions;