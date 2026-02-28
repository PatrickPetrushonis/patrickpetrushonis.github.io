import { useState } from 'react';
//import { cookies } from '../utils/cookies';

const Home = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(0); // First project selected by default
  
  // Sort projects by order property, fallback to original array order
  const projects = data?.projects ? 
    [...data.projects].sort((a, b) => parseInt(a.order) - parseInt(b.order)) : 
    [];

  const handleProjectClick = (index) => {
    setSelectedProject(index);
  };

  return (
    <>
      {/* Banner Section */}
      <div className="banner__container">
        <div className="banner__image--code"></div>
      </div>

      <div className="content">
        {/* About Section */}
        <div className="section__container">
          <div className="section__content">
            <h2 className="section__title" id="section-about">About</h2>
            <hr className="section__rule--about" />
            <div className="flex-content flex__small--alt">
              <div className="flex__small--12 flex__large--6">
                <p>
                  Senior software engineer with 10+ years shipping games across PC, console, and mobile (including Ashes of Creation, Palia, and Life is Strange) at studios ranging from indie to AAA. 
                </p>
                <p>
                  Specializes in C++ gameplay systems, multiplayer networking, and cross-platform CI/CD in Unreal Engine, with parallel full-stack web work in Angular, React, and Vue spanning client and agency projects. 
                </p>
                <p>
                  SDK and platform experience spans Steamworks, PlayFab, Xbox Live, and Nintendo Switch, with recent work building multi-platform ADO pipelines and managing client libraries for Microsoft game services.
                </p>
                <p>
                  Consistently builds the tooling and infrastructure that lets designers and engineers move faster without breaking things. Owns systems end-to-end, from architecture and implementation to documentation, testing, and live-service maintenance. 
                </p>
              </div>
              <div className="flex__small--12 flex__large--6 center">
                <img 
                  className="banner__portrait" 
                  src="/app/img/profile-image.jpg" 
                  alt="Patrick Petrushonis"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Coffee Banner */}
        <div className="banner__container banner__container--slim hide-on-mobile">
          <div className="banner__image--coffee"></div>
        </div>

        {/* Projects Section */}
        <div className="section__container">
          <div className="section__content">
            <h2 className="section__title" id="section-projects">Projects</h2>
            <hr className="section__rule--projects" />
            
            {/* Projects Navigation */}
            <div className="flex-content flex__small--alt">
              {projects.map((project, index) => (
                <div key={project.id} className="flex__small--3 project__item">
                  <button 
                    className={`project__link${index === selectedProject ? ' selected' : ''}`}
                    onClick={() => handleProjectClick(index)}
                  >
                    <img 
                      src={`/app/img/project-${project.id}.webp`} 
                      className="project__image"
                      alt={project.title}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Projects Details */}
            {projects.map((project, index) => (
              <div 
                key={`details-${project.id}`}
                id={`project-${project.id}`}
                className={`project__details${index === selectedProject ? ' selected' : ''}`}
              >
                <h3>{project.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: project.details }} />
              </div>
            ))}
          </div>        
        </div>   
      </div>
    </>
  );
};

export default Home;