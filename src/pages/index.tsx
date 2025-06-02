import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import React, { useEffect, useCallback } from 'react';
import { RiCodeBlock  } from "react-icons/ri";
import { HiFire } from "react-icons/hi";

import styles from './index.module.css';
import { GettingStartedFrame } from "../components/AdditionalFeatures";
import { useColorMode } from '@docusaurus/theme-common/internal';

// Use the recommended import path
import Particles, { initParticlesEngine } from '@tsparticles/react'; 
import type { Engine, Container } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

import TagManager from 'react-gtm-module';
import ReactGA from "react-ga4";

const tagManagerArgs = {
  gtmId: 'GTM-KH2NWDGM'
}

console.log("v0.1");

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const { colorMode  } = useColorMode();

  return (
      <header style={{ zIndex: 1, position: 'relative' }} className={clsx('hero hero--primary', styles.heroBanner)}>
          <div className="container">
              <div className="row" style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between'}}>
                  {/*<div className={styles.container2}>*/}
                  <div className="col col--6">
                      <div className="row">

                          <Heading as="h1" className="hero__title">
                              { /* siteConfig.title */} 
                              <img className="fhenix-logo" alt="fhenix image" src="img/fhenix-logo-build.webp" />
                          </Heading>
                      </div>
                      <div className="row">
                          {/* <p className="hero__subtitle">{siteConfig.tagline}</p> */}
                          <p className="home__description">
                          <span style={{ color: colorMode === 'dark' ? '#E6F7FF' : '#003366' }}>Tools and resources to help you build, launch, and grow your app on Fhenix</span>
                          </p>
                      </div>
                      <div className={clsx("row", styles.ButtonRow)} style={{ marginLeft: -30 , gap: '31px'}}>
                          <div className='col col--3'>
                              <Link
                                  className='tutorial-button minimum'
                                  to="/docs/devdocs/overview"
                                  style={{ 
                                    padding: '10px',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center'
                                }}>
                                  
                                  <RiCodeBlock size={20} style={{ marginRight: '10px' }} /> Docs
                              </Link>
                          </div>
                          <div className='col col--4'>
                              <Link
                                  className='tutorial-button minimum'
                                  to="/docs/indexes/tutorials"
                                  style={{ 
                                    padding: '10px',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center' 
                                }}>
                                  <HiFire size={20} style={{ marginRight: '10px' }} /> Tutorials
                              </Link>
                          </div>


                          {/*</div>*/}
                      </div>
                      <div className={clsx("row", styles.ButtonRowMobile)}>
                          <Link
                              className='docs-button minimum padding'
                              to="/docs/devdocs/overview">
                              Docs
                          </Link>
                      </div>
                      <div className={clsx("row", styles.ButtonRowMobile)}>
                          <Link
                              className='tutorial-button minimum padding'
                              to="/docs/indexes/tutorials">
                              Tutorials
                          </Link>
                      </div>
                  </div>

                  <div className="hide-small-width" style={{marginTop: "40px", position: 'relative', overflow: 'visible'}}>
                    {/* <div className="" style={{marginTop: "-100px"}}> */}
                    { (colorMode === 'dark') ? <img className="page-cover-image" alt="fhenix stuttershock image" src="img/BookDark.svg" style={{maxWidth: '600px'}}/> : <img className="page-cover-image" alt="fhenix stuttershock image" src="img/BookLight.svg" style={{maxWidth: '600px'}}/>}
                    <div style={{
                        position: 'absolute',
                        top: '-25%',
                        left: '-95px',
                        width: '600px',
                        height: '600px',
                        zIndex: -1,
                        opacity: 0.4
                    }}>
                        <img 
                            src="img/visuals/top_section_no-book.svg"
                            style={{
                                width: '100%', 
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                  </div>
              </div>

          </div>
      </header>
  );
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    const [init, setInit] = React.useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });

        if (typeof window !== 'undefined') {
          TagManager.initialize(tagManagerArgs);
          ReactGA.initialize("G-NKHXME4286");
        }
    }, []);

    const particlesLoaded = async (container: Container | undefined): Promise<void> => {
        // console.log(container);
    };

    return (
        <Layout title={`${siteConfig.title}`}
                description="Documentation for Fhenix, the pioneering FHE-enabled L2. Explore how Fhenix is transforming privacy in Blockchain.">
            {init}
            <HomepageHeader />
            <main style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ height: '100px'}}></div>
                <HomepageFeatures/>
            </main>
        </Layout>
    );
}
