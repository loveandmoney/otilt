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
    openCalendarSquare: null
  };

  numDummyDays = 31;

  // This is good
  dummyDayData = Array(this.numDummyDays)
    .fill(null)
    .map((_, i) => {
      return {
        dayCount: i + 1,
        date: `${i + 1}.7`,
        learned: `I learned this thing`
      };
    });

  componentDidMount() {
    fancyLog(`Intern page`);
  }

  handleClick = e => {
    const day = parseInt(
      e.currentTarget.attributes.getNamedItem(`data-day-count`).value
    );

    this.setState({
      openCalendarSquare: day
    });
  };

  handleMouseLeave = e => {
    const day = parseInt(
      e.currentTarget.attributes.getNamedItem(`data-day-count`).value
    );

    // If we just mouse-exited the current open square, then close it
    if (this.state.openCalendarSquare === day) {
      this.setState({
        openCalendarSquare: null
      });
    }
  };

  render() {
    const { frontmatter, location } = this.props;

    return (
      <>
        <SEO
          customTitle={frontmatter.title}
          customDescription={frontmatter.seoDescription}
          customKeywords={frontmatter.seoKeywords}
          path={location.pathname}
        />

        <Layout className="intern-page w-full relative flex flex-col justify-between pt-12 pb-16 bg-black text-white">
          <section className="banner w-full h-screen px-40 flex flex-col justify-center text-center">
            <p>IN TERN PRESENTS</p>
            <h1 className="text-huge font-bold">One Thing I Learned Today</h1>
            <p>FOR THREE MONTHS. AT LOVE + MONEY.</p>
            <p>200 GERTRUDE STREET, FITZROY, INTERNET.</p>
            <p>&#x2193;</p>
          </section>

          <section className="intern-page__calendar w-full flex flex-col">
            <div className="flex flex-row text-center px-40">
              <div className="w-20vw">M</div>
              <div className="w-20vw">T</div>
              <div className="w-20vw">W</div>
              <div className="w-20vw">T</div>
              <div className="w-20vw">F</div>
            </div>

            <ul className="flex flex-wrap px-40">
              {this.dummyDayData.map(({ dayCount, date, learned }, index) => {
                const thisSquareIsActive =
                  this.state.openCalendarSquare === dayCount;

                return (
                  <li
                    key={dayCount}
                    className={`intern-page__calendar__square w-1/5 relative border-dotted border-l-2 border-t-2 border-white ${thisSquareIsActive &&
                      `intern-page__calendar__square--clicked`} ${((index + 1) %
                      5 ===
                      0 ||
                      index === this.dummyDayData.length - 1) &&
                      `border-r-2`} ${index >= this.dummyDayData.length - 5 &&
                      `border-b-2`}`}
                  >
                    <button
                      type="button"
                      className={`square relative ${thisSquareIsActive &&
                        `cursor-default`}`}
                      onClick={this.handleClick}
                      data-day-count={dayCount}
                      onMouseLeave={this.handleMouseLeave}
                    >
                      <div className="intern-page__calendar__square__underlay w-full h-full absolute top-0 p-4 flex flex-col justify-between">
                        <div className="self-end">{date}</div>
                        <div className="self-start text-2xl font-medium">{`Day ${dayCount}`}</div>
                      </div>

                      <div className="intern-page__calendar__square__overlay transition-opacity opacity-0 w-full h-full absolute top-0 p-4 bg-white text-black text-left font-medium">
                        {learned}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
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
      }
    }
  }
`;
