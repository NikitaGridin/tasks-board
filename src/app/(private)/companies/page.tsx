import { ListCompanies } from "@/features/companies/list-companies";
import { Container } from "@/shared/ui/container";
import { Header } from "@/widgets/header/header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Компании",
};

function Companies() {
    return (
        <>
            <Header
                type={"menu"}
                centerContent={
                    <div className="text-2xl font-bold">Компании</div>
                }
            />
            <Container>
                <ListCompanies />
            </Container>
        </>
    );
}

export default Companies;
