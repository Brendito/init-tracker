
const initialCampaignState = {
    savedCampaigns: [
        {
          name: "",
          id: 0,
          encounters: [
            {
              name: "",
              id: 0,
              list: []
            }
          ],
          characters: {
            players: [],
            npcs: [],
            enemies: []
          }
        }
      ]
}

export const campaign = (state = initialCampaignState) => {
    return state;
}