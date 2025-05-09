import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import React from "react";
import { useColorMode  } from '@docusaurus/theme-common';
import Link from "@docusaurus/Link";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  linkTo: string;
  buttonTitle: string;
};



const FeatureList: FeatureItem[] = [
  {
    title: 'CoFHE Quick Start Guide',
    Svg: require('@site/static/img/fhe-contract-card-image.svg').default,
    description: (
      <>
        A step-by-step guide to writing your first FHE contract
      </>
    ),
      linkTo: "/docs/devdocs/quick-start",
      buttonTitle: "Build"
  },
  {
    title: 'Best Practices',
    Svg: require('@site/static/img/getting-started.svg').default,
    description: (
        <>
            Best practices for writing secure and efficient FHE contracts
        </>
    ),
    linkTo: "/docs/devdocs/quick-start/best-practices",
    buttonTitle: "View"
  },
  {
    title: 'Key Considerations',
      Svg: require('@site/static/img/dev.svg').default,

      description: (
      <>
          Key considerations for writing secure and efficient FHE contracts
      </>
    ),
      linkTo: "/docs/devdocs/pay-attention",
      buttonTitle: "View"
  }//,
  // {
  //   title: 'Grant and bounty program',
  //     Svg: require('@site/static/img/grant.svg').default,

  //   description: (
  //     <>
  //         Get funds to grow projects & communities in the Fhenix ecosystem
  //     </>
  //   ),
  //     linkTo: "https://www.fhenix.io/grant-program/",
  //     buttonTitle: "Get Started"
  // }
];

function Feature({title, Svg, description, linkTo, buttonTitle}: FeatureItem) {
  const { colorMode  } = useColorMode();
  const svgClassName = `${styles.featureSvg} white-image`;

  return (
      <div className={clsx("card", styles.custom__card)} style={{ height: '100%' , color: colorMode === 'dark' ? '#E6F7FF' : '#003366'}}>  
          <div className="card__body custom__body_flex">
              <div>
                <Svg className={svgClassName} role="img" style={{ color: colorMode === 'dark' ? '#E6F7FF' : '#003366' }}/>
              </div>

              <Heading as="h2" className="" style={{ fontSize: 22 , color: '#0073E6'}} >{title}</Heading>
              <p>{description}</p>
              <div className="row" style={{ flex: 1 , color: '#0073E6'}}></div>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' , color: '#0073E6'}}>
                <Link
                    className='tutorial-button minimum'
                    to={linkTo}>
                    {buttonTitle}
                </Link>
              </div>
          </div>
      </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
    const { colorMode  } = useColorMode();
    return (
    <section className={styles.features} style={{ position: 'relative', overflow: 'visible'}}>

      <div className="hide-small-width" style={{
        position: 'absolute',
        bottom: '30px',
        left: '0px',
        width: '281px',
        height: '235px',
        zIndex: -1,
        opacity: 0.4,
        overflow: 'visible',
        
      }}>
        <img 
            src="img/visuals/bottom-left.svg"
            style={{
                width: '100%', 
                height: '100%',
            }}
        />
      </div>

      <div  className="hide-small-width" style={{
        position: 'absolute',
        bottom: '20px',
        right: '0px',
        width: '281px',
        height: '235px',
        zIndex: -1,
        opacity: 0.4,
        overflow: 'visible',
        
      }}>
        <img 
            src="img/visuals/bottom-right.svg"
            style={{
                width: '100%', 
                height: '100%',
            }}
        />
      </div>    
      <div className="container" style={{ marginBottom: "80px"}}>
          <div className="row" style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Heading as="h1" className="margin-bottom--lg orb-font" style={{ fontSize: 40, fontWeight: 'normal' }}>
                Useful Links
              </Heading>
          </div>
          {/* style={{ gap: "20px"}} */}
          <div className="row feature_container" style={{ gap: "20px", justifyContent: "space-between" , color: colorMode === 'dark' ? '#E6F7FF' : '#003366'}}>
            {FeatureList.map((props, idx) => (
                <div key={idx} style={{ padding: '0px' }} className="col col--3"> 
                    <Feature {...props} />
                </div>
            ))}
          </div>
          <div className="row" style={{ overflow: 'visible', display: 'flex', justifyContent: 'center', marginTop: '130px', marginBottom: '80px'}}>
              <Heading as="h1" className="text--center  orb-font" style={{ overflow: 'visible', position: 'relative', fontSize: 40, fontWeight: 'normal'}}>
                Connect With US
                <div style={{
                        position: 'absolute',
                        top: '-88px',
                        left: '-68%',
                        width: '800px',
                        height: '205px',
                        zIndex: -1,
                        opacity: 0.4,
                        overflow: 'visible',
                        
                    }}>
                        <img 
                            src="img/visuals/middle.svg"
                            style={{
                                width: '100%', 
                                height: '100%',
                            }}
                        />
                    </div>                
              </Heading>
          </div>
          <div className="row" style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '40px', gap: '20px'}}>
            <div className={clsx("card", styles.custom__card_1)} style={{ height: '200px', width: '500px', padding: '20px' , color: '#0073E6'}}>
              <div className="orb-font" style={{ fontSize: 26, fontWeight: 'bold', color: '#0073E6' }}>Fhenix Developer Updates</div>
              <div style={{ color: colorMode === 'dark' ? '#E6F7FF' : '#003366'}}>Stay up-to-date on the latest Fhenix developer news</div>
              <div className="row" style={{ flex: 1 }}></div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                <Link
                    className='tutorial-button minimum'
                    to="https://cdn.forms-content-1.sg-form.com/bc6341d0-c9d3-11ee-8af0-8a5e6a16f9f5">
                    Sign Up
                </Link>
              </div>

            </div>
            <div className={clsx("card", styles.custom__card_1)} style={{ height: '200px', width: '500px', padding: '20px', color: '#0073E6'}}>
            <div className="orb-font" style={{ fontSize: 26, fontWeight: 'bold', color: '#0073E6' }}>Even More Resources</div>
              <div style={{ color: colorMode === 'dark' ? '#E6F7FF' : '#003366'}}>Hear from Fhenix co-founders, engineering and research teams, ecosystem projects, and more. Join us!</div>
              <div className="row" style={{ flex: 1 }}></div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                
              <div style={{ display: 'flex', gap: '20px' }}>
                <Link
                    className='tutorial-button'
                    to={"https://twitter.com/FhenixIO"}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", gap: '10px' }}> 
                      X / Twitter <img src="img/x.svg" style={{ width: '15px'}}/>
                    </div>
                </Link>

                <Link
                    className='tutorial-button'
                    to={"https://discord.gg/FuVgxrvJMY"}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", gap: '10px' }}> 
                      Discord <img src="img/discord.svg"  style={{ width: '20px'}}/>
                    </div>
                </Link>
              </div>

              </div>
            </div>

          </div>
          

      </div>
    </section>
  );
}
