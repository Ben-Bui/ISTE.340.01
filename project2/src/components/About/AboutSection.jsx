const AboutSection=({data})=>{
  return(
      <div className="about">
          <h1>{data.title}</h1>
          <div className="aboutDescription">
              {data.description}
          </div>
          <div className="aboutQuote">
              <p>"{data.quote}"</p>
              <p>-- {data.quoteAuthor} --</p>
          </div>
      </div>
  )
}

export default AboutSection;