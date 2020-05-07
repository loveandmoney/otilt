/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React, { Component, useContext } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { AppContext } from "~context/AppContext";
import { DocumentContext } from "~context/DocumentContext";
import Layout from "~components/Layout";
import SEO from "~components/SEO";
import { fancyLog } from "~utils/helpers";

import backArrow from "../assets/images/arrows/arrow-left-curved-white.svg";

class InternPageComponent extends Component {
  state = {
    openCalendarSquare: null,
    appliedTheme: `default`,
    hoveredButton: null
  };

  defaultTheme = {
    name: `default`,
    primaryColour: `#000000`,
    secondaryColour: `#ffffff`,
    heading: `<span>One Thing I<br />Learned Today</span>`
  };

  componentDidMount() {
    fancyLog(`Intern page`);
  }

  //

  handleMouseOver = e => {
    this.setState({
      openCalendarSquare: parseInt(
        e.currentTarget.attributes.getNamedItem(`data-day-count`).value
      )
    });
  };

  //

  handleMouseOut = () => {
    this.setState({
      openCalendarSquare: null
    });
  };

  //

  handleThemeButtonClick = e => {
    this.setState({
      appliedTheme: e.currentTarget.attributes.getNamedItem(`data-theme`).value
    });
  };

  //

  handleThemeButtonMouseOver = e => {
    this.setState({
      hoveredButton: e.currentTarget.attributes.getNamedItem(`data-theme`).value
    });
  };

  //

  handleThemeButtonMouseOut = () => {
    this.setState({
      hoveredButton: null
    });
  };

  //

  render() {
    const { frontmatter, location, documentContext } = this.props;
    const bannerTransform = `translateY(${documentContext.scrollTop * 0.15}px)`;

    const { days, themes } = frontmatter;

    const { openCalendarSquare, appliedTheme, hoveredButton } = this.state;

    const appliedThemeProperties =
      themes.find(c => c.name === appliedTheme) || this.defaultTheme;

    const { primaryColour, secondaryColour, heading } = appliedThemeProperties;

    console.log(themes);

    const absentDaySVG = (
      <div className="square">
        <svg className="absolute" style={{ width: `100%`, height: `100%` }}>
          <line
            strokeDasharray="2,2"
            x1="0"
            y1="100%"
            x2="100%"
            y2="0"
            style={{ stroke: `rgb(255,255,255)`, strokeWidth: 2 }}
          />

          <line
            strokeDasharray="2,2"
            x1="100%"
            y1="100%"
            x2="0"
            y2="0"
            style={{ stroke: `rgb(255,255,255)`, strokeWidth: 2 }}
          />
        </svg>
      </div>
    );

    const buttonPositionStyles = {
      top: {
        container: `w-full top-0 right-0 left-0 py-4`,
        button: ``
      },
      right: {
        container: `h-screen top-0 right-0 bottom-0 flex-col w-0 mx-8`,
        button: `rotate-90`
      },
      bottom: {
        container: `w-full right-0 bottom-0 left-0 py-4`,
        button: `rotate-180`
      },
      left: {
        container: `h-screen top-0 bottom-0 left-0 flex-col w-0 mx-8`,
        button: `rotate-270`
      }
    };

    return (
      <>
        <SEO
          customTitle={frontmatter.title}
          customDescription={frontmatter.seoDescription}
          customKeywords={frontmatter.seoKeywords}
          path={location.pathname}
        />
        <Layout
          className="intern-page w-full relative flex flex-col justify-between pb-48 transition-background"
          style={{ backgroundColor: primaryColour, color: secondaryColour }}
        >
          <button
            type="button"
            data-theme="default"
            onClick={this.handleThemeButtonClick}
            className={`${
              appliedTheme === `default` ? `hidden` : `fixed`
            } top-0 left-0 m-6`}
          >
            {/* @Dan if we wanted to add a nice transition to this button, how would you usually do it, seeing as we want display: none on the button when it's hidden, and you can't animate display? */}
            <img src={backArrow} alt="back arrow" />
          </button>

          {themes.map(
            ({
              name,
              position,
              primaryColour: localPrimaryColour,
              secondaryColour: localSecondaryColour,
              imageAlt,
              image
            }) => {
              //

              const buttonActiveStyle = {
                backgroundColor: localSecondaryColour,
                color: localPrimaryColour
              };

              const buttonInactiveStyle = {
                backgroundColor: primaryColour,
                color: secondaryColour,
                borderColor: `#ffffff`
              };

              const { container, button } = buttonPositionStyles[position];

              return (
                <div key={name}>
                  <div
                    className={`fixed z-20 flex items-center justify-center pointer-events-none ${container}`}
                  >
                    {/* @Dan for the left and right containers, I've had to set width = 0 and a margin to keep it off the edge, 
                        cause if we let width = auto it takes the non-rotated width of the button
                        any other ideas here?? 
                   */}
                    <button
                      type="button"
                      data-theme={name}
                      onClick={this.handleThemeButtonClick}
                      onMouseOver={this.handleThemeButtonMouseOver}
                      onFocus={this.handleThemeButtonMouseOver}
                      onMouseLeave={this.handleThemeButtonMouseOut}
                      style={
                        appliedTheme === name
                          ? buttonActiveStyle
                          : buttonInactiveStyle
                      }
                      className={`px-8 relative block z-20 border-2 border-solid transition-background rounded-18 pointer-events-auto whitespace-no-wrap	${button}`}
                    >
                      {name.toUpperCase()}
                    </button>
                  </div>

                  <div
                    className={`w-full h-full top-0 flex items-center justify-center z-40 pointer-events-none ${
                      hoveredButton === name ? `fixed` : `hidden`
                    }`}
                  >
                    <Img
                      className="intern-page__theme-image block"
                      fluid={image.childImageSharp.fluid}
                      alt={imageAlt}
                    />
                  </div>
                </div>
              );
            }
          )}

          <section
            className="w-full h-screen flex flex-col justify-center text-center pointer-events-none animation-appear"
            style={{ transform: bannerTransform }}
            // @Dan this parallax is really janky when you scroll through on a mouse, for obvious reasons.
            //      Do we just assume no one uses a mouse or can we improve it?
          >
            <h3 className="b2">IN TERN PRESENTS</h3>

            <h1
              className={`mt-6 mb-12 font-bold ${
                appliedTheme === `default` ? `f1` : `f2`
              }`}
              dangerouslySetInnerHTML={{ __html: heading }}
            />
            {/* @Dan the animation-appear doens't happen when we change themes, which it used to, 
                I think maybe it's too slow now that we are getting the heading html from markdown rather than a static variable? Maybe, I'm not sure.    
            */}

            <p className="b2">FOR THREE MONTHS. AT LOVE + MONEY.</p>
            <p className="mt-1 b2">200 GERTRUDE STREET, FITZROY, INTERNET.</p>
            <p className="mt-1 f2">&#x2193;</p>
          </section>

          <section className="w-full flex flex-col px-24">
            <ol className="flex text-center sticky top-0 z-10 transition-background">
              <li className="w-1/5 py-3 f4">M</li>
              <li className="w-1/5 py-3 f4">T</li>
              <li className="w-1/5 py-3 f4">W</li>
              <li className="w-1/5 py-3 f4">T</li>
              <li className="w-1/5 py-3 f4">F</li>
            </ol>

            <ol className="flex flex-wrap">
              {days.map(({ absent, dayCount, date, learned, theme }, index) => {
                const thisSquareIsActive = openCalendarSquare === dayCount;

                const withBorderBottom = index >= days.length - 5;

                const withBorderRight =
                  (index + 1) % 5 === 0 || index === days.length - 1;

                return (
                  <li
                    key={`${date}`}
                    className={`w-1/5 relative border-dotted border-white border-t-2 ${
                      withBorderRight ? `border-r-2` : ``
                    } ${withBorderBottom ? `border-b-2` : ``} border-l-2 `}
                  >
                    {theme !== appliedTheme && appliedTheme !== `default` && (
                      <div className="w-full h-full absolute top-0 z-10 blurred" />
                    )}
                    {absent ? (
                      absentDaySVG
                    ) : (
                      <button
                        type="button"
                        className="square relative block cursor-default"
                        data-day-count={dayCount}
                        onMouseOver={this.handleMouseOver}
                        onMouseOut={this.handleMouseOut}
                        onBlur={this.handleMouseOut}
                        onFocus={this.handleMouseOver}
                      >
                        <div>
                          <div className="w-full h-full absolute top-0 p-4 flex flex-col justify-between">
                            <h3 className="self-end">{date}</h3>
                            <h2 className="self-start text-2xl font-medium">{`Day ${dayCount}`}</h2>
                          </div>

                          <div
                            className={`${
                              thisSquareIsActive ? `opacity-100` : `opacity-0`
                            } transition-opacity w-full h-full absolute top-0 p-4 text-left font-medium transition-background`}
                            style={{
                              backgroundColor: secondaryColour,
                              color: primaryColour
                            }}
                          >
                            <p>{learned}</p>
                          </div>
                        </div>
                      </button>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        </Layout>
      </>
    );
  }
}

//

const InternPage = ({ data, location }) => {
  const appContext = useContext(AppContext);
  const documentContext = useContext(DocumentContext);
  const { frontmatter } = data.markdownRemark;

  return (
    <InternPageComponent
      appContext={appContext}
      documentContext={documentContext}
      frontmatter={frontmatter}
      location={location}
    />
  );
};

export default InternPage;

export const query = graphql`
  query InternPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        seoDescription
        seoKeywords
        themes {
          name
          position
          primaryColour
          secondaryColour
          heading
          imageAlt
          image {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 75) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
        days {
          absent
          dayCount
          date
          learned
          theme
        }
      }
    }
  }
`;
