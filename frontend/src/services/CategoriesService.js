import { HTTP } from './config';

export const getCategories = () => {
  return HTTP.get(`/categories`);
};

// export const getSelectionDistribution = (stepId) => {
//     return HTTP.get(`extraction/distribution/${stepId}/selection`);
// }

// export const createForm = (stepId, distribution) => {
//     return HTTP.post(`extraction/distribution/${stepId}`, distribution);
// }

// export const getStudiesConflicts = (stepId) => {
//     return HTTP.get(`extraction/distribution/${stepId}/conflict`);
// }
