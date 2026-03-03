import { FaExclamationTriangle, FaChartLine, FaHome, FaGlobe, FaShieldAlt } from 'react-icons/fa'
import './ProblemSection.css'

function ProblemSection() {
  return (
    <section className="problem-section" id="problem">
      <div className="container">
        <div className="problem-inner">
          <div className="section-badge">
            <FaExclamationTriangle />
            <span>The Problem</span>
          </div>
          <h2>Working Hard But Still Struggling to Make Ends Meet?</h2>
          <p className="lead">
            You're not alone. Millions of people are trapped in the same cycle — working tirelessly 
            but never getting ahead financially.
          </p>

          <div className="problem-cards">
            <div className="problem-card">
              <div className="problem-card-icon"><FaChartLine /></div>
              <h3>Rising Costs, Stagnant Income</h3>
              <p>The bills keep increasing, but your salary stays the same. Inflation eats away at your purchasing power every month.</p>
            </div>
            <div className="problem-card">
              <div className="problem-card-icon"><FaShieldAlt /></div>
              <h3>Job Insecurity</h3>
              <p>Living in constant fear of layoffs, downsizing, or company closures. One paycheck away from financial crisis.</p>
            </div>
            <div className="problem-card">
              <div className="problem-card-icon"><FaHome /></div>
              <h3>No Work-Life Balance</h3>
              <p>Stuck in a rigid 9-5 schedule with no flexibility. Missing out on precious time with family and personal pursuits.</p>
            </div>
            <div className="problem-card">
              <div className="problem-card-icon"><FaGlobe /></div>
              <h3>Limited Earning Potential</h3>
              <p>Local job markets offer low salaries. No access to global opportunities that pay in stronger currencies.</p>
            </div>
          </div>

          <blockquote className="problem-quote">
            <span className="quote-icon">"</span>
            You don't need another degree. You need a skill that pays.
            <span className="quote-icon">"</span>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
