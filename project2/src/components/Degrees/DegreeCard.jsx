const DegreeCard = ({ title, description, concentrations }) => {
    return (
        <div className="degree-card">
            <h3>{title}</h3>
            <div dangerouslySetInnerHTML={{ __html: description }} />
            
            {concentrations && (
                <div className="concentrations">
                    <h4>Concentrations:</h4>
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