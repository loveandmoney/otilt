/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React, { Component, useContext } from "react";
import { graphql } from "gatsby";
import { AppContext } from "~context/AppContext";
import Layout from "~components/Layout";
import SEO from "~components/SEO";
import { fancyLog } from "~utils/helpers";

class InternPageComponent extends Component {
  // dc: state goes here
  // state = {
  //   openCalendarSquare: null
  // }

  //

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

  // dc: constructors are no longer necessary
  constructor(props) {
    super(props); // dc: super no longer necessary
    this.state = { openCalendarSquare: null };
    this.handleClick = this.handleClick.bind(this); // dc: .bind isn't required
    this.handleMouseLeave = this.handleMouseLeave.bind(this); // dc: .bind isn't required
  }

  componentDidMount() {
    fancyLog(`Intern page`);
  }

  //

  //
  // those affect the state variables

  handleClick = e => {
    const day = parseInt(
      e.currentTarget.attributes.getNamedItem(`data-day-count`).value
    ); // dc: separate logical blocks with 1 empty line
    this.setState({
      openCalendarSquare: day
    });
  };

  handleMouseLeave = e => {
    const day = parseInt(
      e.currentTarget.attributes.getNamedItem(`data-day-count`).value
    ); // dc: separate logical blocks with 1 empty line
    // If we just mouse-left the current open square, then close it
    if (this.state.openCalendarSquare === day) {
      this.setState({
        openCalendarSquare: null
      });
    }
  };
  // handleHover = () => {}

  //

  render() {
    const { frontmatter, location } = this.props;

    // @Will you'll be spending most of your time in here
    return (
      <>
        <SEO
          customTitle={frontmatter.title}
          customDescription={frontmatter.seoDescription}
          customKeywords={frontmatter.seoKeywords}
          path={location.pathname}
        />

        <Layout className="intern-page w-full px-40 relative flex flex-col justify-between pt-12">
          <section className="banner w-full h-screen flex flex-col justify-center text-center">
            <p>IN TERN PRESENTS</p>
            <h1 className="text-huge font-bold">One Thing I Learned Today</h1>
            <p>FOR THREE MONTHS. AT LOVE + MONEY.</p>
            <p>200 GERTRUDE STREET, FITZROY, INTERNET.</p>
            <p>&#x2193;</p>
          </section>

          <section className="calendar w-full flex flex-col">
            <div className="flex flex-row text-center">
              <div className="w-20vw">M</div>
              <div className="w-20vw">T</div>
              <div className="w-20vw">W</div>
              <div className="w-20vw">T</div>
              <div className="w-20vw">F</div>
            </div>

            {/* // dc: more lines between disparate template components */}
            {/* // dc: this flexer should be a ul */}

            <div className="flex flex-row flex-wrap">
              {this.dummyDayData.map(({ dayCount, date, learned }, i) => {
                // dc: call this "index"; if we have nested indices I don't want to see j, k, ...

                return (
                // @Dan how do we make these square? flex-wrap and width = vh doesnt work
                //      at the momment these are width=20% and height = some fixed amount
                //
                // @Dan how do we make the borders blend in with each other? Atm we just have regular dotted borders
                //
                // @Dan this class list logic looks messy af, I sometimes use a front-end package called classnames to clean up classname logic, lemme know if its okay to install that.

                  /*
                  dc:
                  - You've got px-40 on 'intern-page', and the calendar squares are children of that. Move px-40 to the 
                    banner section, and that'll solve the width. Then, add this to the SCSS:
                      width: 20vw;
                      height: 20vw;

                  - OK to install classnames, but you can refine this with ternary operators and object destructuring, e.g.
                      const { openCalendarSquare } = this.state;

                      className={`${openCalendarSquare === dayCount ? `calendar-square--clicked` : `cursor-pointer`}

                  - 'calendar-square' should be an li
                  - Clickable 'calendar-square' should be a button
                  - each 'calendar-square' li should have a unique key property
                  - check the intern-page.scss for notes on BEM class hierarchy
                  */
                  <div
                    className={`calendar-square relative w-1/5 h-32 border-dotted border border-white ${this
                      .state.openCalendarSquare === dayCount &&
                      `calendar-square--clicked`} ${this.state
                      .openCalendarSquare !== dayCount && `cursor-pointer`}`}
                    data-day-count={dayCount}
                    onClick={this.handleClick}
                    onMouseLeave={this.handleMouseLeave}
                    // @Dan I'm new to the following 3 things but ESLint said I had to - assuming those are your settings?
                    // dc: Yeah, for accessibility, if it's clickable it should be a button. Instead of a div,
                    //    this should be an <li><button type="button></button></li>
                    role="textbox"
                    tabIndex={i}
                    onKeyDown={this.handleClick}
                  >
                    <div className="calendar-square__underlay w-full h-full absolute p-4 flex flex-col justify-between">
                      <div className="self-end">{date}</div>
                      <div className="text-2xl">{`Day ${dayCount}`}</div>
                    </div>
                    <div className="calendar-square__overlay transition-opacity w-full h-full absolute p-4 bg-white text-black">
                      {learned}
                    </div>
                  </div>
                );
              })}
            </div>
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
