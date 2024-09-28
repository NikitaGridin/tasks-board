import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserCompanies } from "../_actions/get-user-companies";

const userCompanies = "userCompanies";

export function useUserCompanies() {
    return useQuery({
        queryKey: [userCompanies],
        queryFn: () => getUserCompanies(),
    });
}
export function useInvalidateUserCompanies() {
    const queryClient = useQueryClient();
    return () =>
        queryClient.invalidateQueries({
            queryKey: [userCompanies],
        });
}
