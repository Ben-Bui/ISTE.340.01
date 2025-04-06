const AboutSection = ({ data }) => {
    // Safely extract description with proper fallbacks
    const getDescription = () => {
      if (!data?.description) return 'No description available';
      
      // Handle HTML content safely
      if (typeof data.description === 'object') {
        return data.description.value || 
               data.description.description || 
               JSON.stringify(data.description);
      }
      
      return data.description;
    };
  
    // Check if description contains HTML tags
    const containsHTML = (str) => {
      if (typeof str !== 'string') return false;
      return /<[a-z][\s\S]*>/i.test(str);
    };
  
    const description = getDescription();
  
    return (
      <section className="about-section">
        <h2>{data?.title || 'About iSchool'}</h2>
        
        <div className="description">
          {containsHTML(description) ? (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
            <p>{description}</p>
          )}
        </div>
  
        {data?.quote && (
          <div className="quote">
            <blockquote>"{data.quote}"</blockquote>
            {data.quoteAuthor && <cite>- {data.quoteAuthor}</cite>}
          </div>
        )}
      </section>
    );
  };
  
  export default AboutSection;