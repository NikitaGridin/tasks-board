import { getCompany } from "@/entity/company/company.server";
import { CompanyDetails } from "@/features/company-details/company";
import { ProjectDetails } from "@/features/project-details/project";
import { Container } from "@/shared/ui/container";
import { Header } from "@/widgets/header/header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Компания",
};

async function CompanyPage({ params }: { params: { id: string } }) {
    const company = await getCompany({ companyId: +params.id });

    if (company.error) {
        return <div>{company.error.message}</div>;
    }
    if (!company.data) {
        return <div>Проект не найден</div>;
    }

    return (
        <>
            <Header
                type={"back"}
                centerContent={
                    <div className="text-2xl font-bold">
                        {company.data.name}
                    </div>
                }
            />
            <Container>
                <CompanyDetails companyId={+params.id} />
            </Container>
        </>
    );
}

export default CompanyPage;
