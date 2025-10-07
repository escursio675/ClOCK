import React, { Component } from "react";
import styles from "./FlipDigit.module.css";

const AnimatedCard = ({ animation, digit }) => (
  <div className={`${styles.flipCard} ${styles[animation]}`}>
    <span>{digit}</span>
  </div>
);

const StaticCard = ({ position, digit }) => (
  <div className={styles[position]}>
    <span>{digit}</span>
  </div>
);

const FlipUnitContainer = ({ digit, shuffle, unit }) => {
  let currentDigit = digit;
  let previousDigit = digit - 1;

  if (unit !== "hours") {
    previousDigit = previousDigit === -1 ? 59 : previousDigit;
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit;
  }

  currentDigit = String(currentDigit).padStart(2, "0");
  previousDigit = String(previousDigit).padStart(2, "0");

  const digit1 = shuffle ? previousDigit : currentDigit;
  const digit2 = !shuffle ? previousDigit : currentDigit;

  const animation1 = shuffle ? "fold" : "unfold";
  const animation2 = !shuffle ? "fold" : "unfold";

  return (
    <div className={styles.flipUnitContainer}>
      <StaticCard position="upperCard" digit={currentDigit} />
      <StaticCard position="lowerCard" digit={previousDigit} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  );
};

class Flip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      hoursShuffle: true,
      minutes: 0,
      minutesShuffle: true,
      seconds: 0,
      secondsShuffle: true,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateTime() {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    if (hours !== this.state.hours) {
      this.setState((prev) => ({
        hours,
        hoursShuffle: !prev.hoursShuffle,
      }));
    }

    if (minutes !== this.state.minutes) {
      this.setState((prev) => ({
        minutes,
        minutesShuffle: !prev.minutesShuffle,
      }));
    }

    if (seconds !== this.state.seconds) {
      this.setState((prev) => ({
        seconds,
        secondsShuffle: !prev.secondsShuffle,
      }));
    }
  }

  render() {
    const {
      hours,
      minutes,
      hoursShuffle,
      minutesShuffle,
    } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.flipClock}>
          <FlipUnitContainer unit="hours" digit={hours} shuffle={hoursShuffle} />
          <FlipUnitContainer unit="minutes" digit={minutes} shuffle={minutesShuffle} />
          {/* <FlipUnitContainer unit="seconds" digit={seconds} shuffle={secondsShuffle} /> */}
        </div>
      </div>
    );
  }
}

export default Flip;