import { useParams } from "react-router-dom";
import projectData from "../data/projectdata.json";
import ProjectHeader from "../components/Projects/ProjectHeader";
import ProjectInfo from "../components/Projects/ProjectInfo";
import ProjectGallery from "../components/Projects/ProjectGallery";
import ProjectMechanics from "../components/Projects/ProjectMechanics";
import ProjectPrevNext from "../components/Projects/ProjectPrevNext";

export default function ProjectPage() {
    const { projectId } = useParams();
    const project = projectData.projects.find(p => p.id === projectId);

    if (!project) {
        return <div className="container mx-auto px-4 py-12 text-center">Project niet gevonden</div>;
    }

    // Find previous and next projects (with looping)
    const currentIndex = projectData.projects.findIndex(p => p.id === projectId);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : projectData.projects.length - 1;
    const nextIndex = currentIndex < projectData.projects.length - 1 ? currentIndex + 1 : 0;

    const previousProject = {
        title: projectData.projects[previousIndex].title,
        url: `/projects/${projectData.projects[previousIndex].id}`
    };
    const nextProject = {
        title: projectData.projects[nextIndex].title,
        url: `/projects/${projectData.projects[nextIndex].id}`
    };

    return (
        <div className="relative z-10 bg-(--bg)">
            <ProjectHeader project={project} />

            <div className="container mx-auto px-4 space-y-24 pb-24">
                <ProjectInfo project={project} />
                <ProjectGallery project={project} />
                <ProjectMechanics project={project} />
                <ProjectPrevNext previous={previousProject} next={nextProject} />
            </div>
        </div>
    );
}