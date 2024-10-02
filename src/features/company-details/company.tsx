"use client";

import { ProjectDetails } from "../project-details/project";
import { ListProjects } from "../projects/list-projects";
import { useCompanyDetailsStore } from "./model/use-company-details-store";

export const CompanyDetails = ({ companyId }: { companyId: number }) => {
    const { selectedProject } = useCompanyDetailsStore();

    return (
        <div className="space-y-2">
            <ListProjects companyId={companyId} />
            {selectedProject && <ProjectDetails projectId={selectedProject} />}
        </div>
    );
};
