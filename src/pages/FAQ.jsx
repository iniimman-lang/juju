import { useState, useEffect } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import './FAQ.css'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const faqs = [
    {
      question: 'Do I need any prior experience to join?',
      answer: 'Not at all! All our courses are designed for complete beginners. We start from the basics and gradually build up your skills. Our experienced instructors will guide you every step of the way.'
    },
    {
      question: 'How long does each course take?',
      answer: 'Course durations vary from 4 to 10 weeks depending on the skill you choose. You can study at your own pace, and you will have lifetime access to all course materials even after completion.'
    },
    {
      question: 'What is the internship program like?',
      answer: 'Our internship program gives you real-world experience by working on actual client projects. You will build a professional portfolio, gain references, and develop confidence in your skills before starting to freelance or apply for jobs.'
    },
    {
      question: 'Do you guarantee job placement?',
      answer: 'While we cannot guarantee jobs, we provide extensive support including resume building, portfolio reviews, interview preparation, and direct connections to employers and clients. 85% of our graduates find paid work within 3 months.'
    },
    {
      question: 'Can I take multiple courses?',
      answer: 'Yes! Many students enroll in multiple courses to diversify their skills. You can bundle courses at a discounted rate. Popular combinations include Social Media Management + Facebook Ads, or Graphic Design + Video Editing.'
    },
    {
      question: 'What if I am not satisfied with the course?',
      answer: 'We offer a 30-day money-back guarantee. If you are not completely satisfied within the first 30 days, simply reach out and we will refund your payment, no questions asked.'
    },
    {
      question: 'Are the classes live or recorded?',
      answer: 'We offer both! Core lessons are pre-recorded for flexible learning, but we also have weekly live Q&A sessions, group coaching calls, and community support. All live sessions are recorded for later viewing.'
    },
    {
      question: 'How do I get paid as a freelancer?',
      answer: 'We teach you how to find clients, set your rates, create contracts, and handle payments. We also connect you with our network of employers who are actively looking for skilled professionals.'
    },
    {
      question: 'Is there a payment plan available?',
      answer: 'Yes, we offer flexible payment plans. You can pay in 2-3 installments for most courses. Contact our admissions team to discuss options that work for your budget.'
    },
    {
      question: 'What support do I get during the course?',
      answer: 'You get access to instructor support, a dedicated student community, weekly group calls, peer feedback sessions, and lifetime access to course updates. We are with you until you succeed.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <main className="faq-page">
      <section className="faq-hero">
        <div className="container">
          <div className="faq-hero-content">
            <h1>Frequently Asked Questions</h1>
            <p>Got questions? We have got answers. Find everything you need to know about Digital Course Arena.</p>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div
                className={`faq-card ${openIndex === index ? 'open' : ''}`}
                key={index}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <FaChevronDown className={`chevron ${openIndex === index ? 'rotated' : ''}`} />
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Still Have Questions?</h2>
            <p>Our team is here to help. Reach out and we will get back to you within 24 hours.</p>
            <a href="mailto:info@digitalcoursearena.com" className="btn primary btn-large">Contact Us</a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default FAQ
