import React from 'react'
import StatisticsLine from './StatisticsLine'

const Statistics = props => {
    const {good, neutral, bad, all, average, positive} = props
  return (
    <>
    {!all ? (
        <p>No feedback given</p>
    ) : (
    <table>
        <tbody>
        <StatisticsLine text={'good'} value={good} />
        <StatisticsLine text={'neutral'} value={neutral} />
        <StatisticsLine text={'bad'} value={bad} />
        <StatisticsLine text={'all'} value={all} />
        <StatisticsLine text={'average'} value={average} />
        <StatisticsLine text={'positive'} value={positive} />
        </tbody>
    </table>
    )}
    </>
  )
}

export default Statistics