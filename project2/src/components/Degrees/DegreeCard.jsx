const DegreeCard = ({ title, description, concentrations }) => {
    return (
      <div className="degree-card">
        <h3>{title}</h3>
        <div className="degree-description" dangerouslySetInnerHTML={{ __html: description }} />
        {concentrations && (
          <div className="concentrations">
            <h4>{concentrations[0].includes('certificate') ? 'Certificates:' : 'Concentrations:'}</h4>
            <ul>
              {concentrations.map((conc, i) => (
                <li key={i}>{conc}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default DegreeCard;