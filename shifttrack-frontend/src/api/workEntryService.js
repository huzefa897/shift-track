import api from "../axios";

export async function getFilteredWorkEntries(filters, page =0,size =10) {
  const params = {
    from: filters.from,
    to: filters.to,
    ...(filters.companyId && { companyId: filters.companyId }),
  };
if(filters.companyId){
  params.append("companyId", filters.companyId);
}

const response = await api.get(`/work-entries/paginated?${params.toString()}`);
  return response.data;
}