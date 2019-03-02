import * as actionTypes from "../constants/actionTypes";

export const saveCampaign = campaign => ({
  type: actionTypes.SAVE_CAMPAIGN,
  campaign
});

export const createCampaign = campaign => ({
  type: actionTypes.CREATE_CAMPAIGN,
  campaign
});

export const loadCampaign = campaignId => ({
  type: actionTypes.LOAD_CAMPAIGN,
  campaignId
});

export const clearCampaign = campaignId => ({
  type: actionTypes.CLEAR_CAMPAIGN,
  campaignId
});

export const saveCharToCampaign = char => ({
  type: actionTypes.SAVE_CHAR_TO_CAMPAIGN,
  char
});

export const deleteChar = (id, charType) => ({
  type: actionTypes.DELETE_CHAR,
  id,
  charType
});
