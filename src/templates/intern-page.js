/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React, { Component, useContext } from "react";
import { graphql } from "gatsby";
import { AppContext } from "~context/AppContext";
import Layout from "~components/Layout";
import SEO from "~components/SEO";
import { fancyLog } from "~utils/helpers";

class InternPageComponent extends Component {
  state = {
    openCalendarSquare: null,
    theme: `default`
  };

  // @Dan so is this theme data gonna feed in from markdown later? I suppose we'll use inline styles? and dangerouslySetHTML?
  themes = {
    default: {
      bgStyle: `bg-black`,
      fontStyle: `text-white`,
      lessonStyle: `bg-white text-black`,
      // we use <br />'s rather than padding, we wrap these babies in a plain old span, so the semantics and style can be handled by render
      headingText: (
        <span>
          One Thing I<br />
          Learned Today
        </span>
      )
    },
    technical: {
      bgStyle: `bg-green`,
      fontStyle: `text-lipstick`,
      lessonStyle: `bg-lipstick text-green`,
      headingText: (
        <span>
          Old mates Figma,
          <br />
          Dimension, Principle &amp;
          <br />
          Pantone.
        </span>
      )
    },
    life: {
      bgStyle: `bg-red`,
      fontStyle: `text-blue-light`,
      lessonStyle: `bg-blue-light text-red`,
      headingText: (
        <span>
          Vegan cheezies, Fairy
          <br />
          Floss, &amp; first time
          <br />
          birthday cakes.
        </span>
      )
    },
    design: {
      bgStyle: `bg-blue-royal`,
      fontStyle: `text-gold`,
      lessonStyle: `bg-gold text-blue-royal`,
      headingText: (
        <span>
          The age old question:
          <br />
          Is This Graphic Designs?
          <br />
          (Hint: 5 degrees)
        </span>
      )
    },
    office: {
      bgStyle: `bg-brown`,
      fontStyle: `text-pink`,
      lessonStyle: `bg-pink text-brown`,
      headingText: (
        <span>
          Pat’s pants, passwords
          <br />
          &amp; douchebag pool
          <br />
          table owners.
        </span>
      )
    }
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
      theme: e.currentTarget.attributes.getNamedItem(`data-theme`).value
    });
  };

  //

  render() {
    const { frontmatter, location } = this.props;

    const { days } = frontmatter;

    const { openCalendarSquare, theme } = this.state;

    const { bgStyle, fontStyle, lessonStyle, headingText } = this.themes[theme];

    const Heading = ({ children }) => {
      return (
        <h1
          className={`mt-6 mb-12 font-bold animation-appear ${
            theme === `default` ? `f1` : `f2`
          }`}
        >
          {children}
        </h1>
      );
    };

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

    return (
      <>
        <SEO
          customTitle={frontmatter.title}
          customDescription={frontmatter.seoDescription}
          customKeywords={frontmatter.seoKeywords}
          path={location.pathname}
        />
        {/* @Dan there's still a padding at the top of the main container, which kinda stuffs up the opening viewport */}
        <Layout
          className={`intern-page w-full relative flex flex-col justify-between pt-12 pb-48 transition-background ${bgStyle} ${fontStyle}`}
        >
          {/* // */}
          {/* @Dan I wrestled with these buttons for a bit.. tried one container, no container, settled on this structure..
               So I'm basically just using 4x h-full or w-full containers to center the buttons. It's a bit weird. Ain't perfect (bottom and top aren't the same for some reason..)
    
               // also, there's a lot of repititon here, between and within the buttons, 
               // it'd be nice if we did a map with parameters feeding from md or some static varible or something, 
               // but might be tricky with the layout sitch. Lemme know thoughts.
           */}
          <div className="flex w-full z-20 justify-center fixed top-2">
            <button
              type="button"
              data-theme="office"
              onClick={this.handleThemeButtonClick}
              className={`w-212 fixed z-20 border-2 border-solid transition-background rounded-18 ${
                theme === `office`
                  ? `${lessonStyle}`
                  : `border-white ${bgStyle}`
              }`}
            >
              OFFICE
            </button>
          </div>
          <div className="flex flex-col h-screen w-0 z-20 justify-center items-center fixed right-2">
            <button
              type="button"
              data-theme="design"
              onClick={this.handleThemeButtonClick}
              className={`w-212 fixed z-20 border-2 border-solid transition-background rounded-18 rotate-90 ${
                theme === `design`
                  ? `${lessonStyle}`
                  : `border-white ${bgStyle}`
              }`}
            >
              DESIGN
            </button>
          </div>
          <div className="flex w-full z-20 justify-center fixed bottom-2">
            <button
              type="button"
              data-theme="life"
              onClick={this.handleThemeButtonClick}
              className={`w-212 fixed z-20 border-2 border-solid transition-background rounded-18 rotate-180 ${
                theme === `life` ? `${lessonStyle}` : `border-white ${bgStyle}`
              }`}
            >
              LIFE
            </button>
          </div>
          <div className="flex flex-col h-screen w-0 z-20 justify-center items-center fixed left-2">
            <button
              type="button"
              data-theme="technical"
              onClick={this.handleThemeButtonClick}
              className={`w-212 fixed z-20 border-2 border-solid transition-background rounded-18 rotate-270 ${
                theme === `technical`
                  ? `${lessonStyle}`
                  : `border-white ${bgStyle}`
              }`}
            >
              TECHNICAL
            </button>
          </div>

          <section className="w-full h-screen flex flex-col justify-center text-center">
            <h3 className="b2">IN TERN PRESENTS</h3>

            <Heading>{headingText}</Heading>

            <p className="b2">FOR THREE MONTHS. AT LOVE + MONEY.</p>
            <p className="mt-1 b2">200 GERTRUDE STREET, FITZROY, INTERNET.</p>
            <p className="mt-1 f2">&#x2193;</p>
          </section>

          <section className="w-full flex flex-col px-24">
            <ol
              className={`flex text-center sticky top-0 z-10 transition-background ${bgStyle}`}
            >
              <li className="w-1/5 py-3 f4">M</li>
              <li className="w-1/5 py-3 f4">T</li>
              <li className="w-1/5 py-3 f4">W</li>
              <li className="w-1/5 py-3 f4">T</li>
              <li className="w-1/5 py-3 f4">F</li>
            </ol>

            <ol className="flex flex-wrap">
              {days.map(({ absent, dayCount, date, learned }, index) => {
                const thisSquareIsActive = openCalendarSquare === dayCount;

                const withBorderBottom = index >= days.length - 5;

                const withBorderRight =
                  (index + 1) % 5 === 0 || index === days.length - 1;

                return (
                  <li
                    key={`${date}`} // atm this will make the console cry cause there are heaps of null dates in wil.md, I will fix later
                    className={`w-1/5 relative border-dotted border-white border-t-2 ${
                      withBorderRight ? `border-r-2` : ``
                    } ${withBorderBottom ? `border-b-2` : ``} border-l-2 `}
                  >
                    {absent ? (
                      absentDaySVG
                    ) : (
                      <button
                        type="button"
                        className="square relative block cursor-default"
                        data-day-count={dayCount}
                        onMouseOver={this.handleMouseOver}
                        onMouseOut={this.handleMouseOut} // @Derg using mouseout so that it handles leaving the calendar altogether - know any way to do this wiht one handler or is this ok?
                        onBlur={this.handleMouseOut} // accessbility stuff <-->
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
                            } transition-opacity w-full h-full absolute top-0 p-4 text-left font-medium transition-background ${lessonStyle}`}
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
  const { frontmatter } = data.markdownRemark;

  return (
    <InternPageComponent
      appContext={appContext}
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
        days {
          absent
          dayCount
          date
          learned
        }
      }
    }
  }
`;
