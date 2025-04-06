const AboutSection = ({ data }) => {
  // Safely extract description
  const getDescription = () => {
    if (!data) return 'No description available';
    
    // Handle different description formats
    if (typeof data.description === 'object') {
      return data.description.value || data.description.description || '';
    }
    
    return data.description || '';
  };

  // Safely extract quote
  const getQuote = () => {
    if (!data) return null;
    
    // Handle cases where quote might be in different formats
    if (typeof data.quote === 'object') {
      return {
        text: data.quote.text || data.quote.quote || '',
        author: data.quote.author || data.quote.quoteAuthor || ''
      };
    }
    
    return {
      text: data.quote || '',
      author: data.quoteAuthor || ''
    };
  };

  const description = getDescription();
  const quote = getQuote();

  return (
    <section className="about-section">
      <h2>{data?.title || 'About iSchool'}</h2>
      
      <div className="description">
        {description.includes('<') ? (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <p>{description}</p>
        )}
      </div>

      {quote?.text && (
        <div className="quote">
          <blockquote>"{quote.text}"</blockquote>
          {quote.author && <cite>- {quote.author}</cite>}
        </div>
      )}
    </section>
  );
};

export default AboutSection;