import { buildQueryParams } from "@farhantallei/fetcher/helper"

import { oasisFetcher } from "@/lib/fetcher"
import type { SingleResponse } from "@/types/response"

import type {
  ProfileDpModel,
  ProfileDpQuery,
  ProfileModel,
  ProfileQuery,
} from "./types"

export async function getProfile(query: ProfileQuery) {
  const q = buildQueryParams({ nim: query.encryptedKey })

  const res = await oasisFetcher<SingleResponse<ProfileModel>>(
    "/feature-guardianship/guardianship-collegestudent/profile",
    q,
  )()

  return res.result
}

export async function getProfileDp(query: ProfileDpQuery) {
  const res = await oasisFetcher<SingleResponse<ProfileDpModel | null>>(
    `/storage/v1/profile/view/file/role=Mahasiswa&username=${query.encryptedKey}&flag=photo_profile&type=photo`,
  )({
    headers: {
      Authorization: `Bearer ${query.tokenStorage}`,
    },
  })

  return res.result
}
