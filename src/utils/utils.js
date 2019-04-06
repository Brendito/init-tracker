import * as types from '../constants/formGroupTypes'
export function formGroupListener(name, value, type, state) {
   switch (type) {
      case types.ATTRIBUTES:
         return { attributes: { ...state.attributes, [name]: value } }
      // case types.STATS:
      //   this.setState({
      //     stats: { ...this.state.stats, [name]: value }
      //   });
      //   break;
      default:
         return { [name]: value }
   }
}

export function npcFilter(chars, searchFilter, ratingFilter, dataFilter) {
   const filteredNPCs = chars.filter(npc => {
      // All filtered
      if (searchFilter !== '' && ratingFilter !== '' && dataFilter !== '') {
         return (
            npc.name.toLowerCase().search(searchFilter.toLowerCase()) !== -1 &&
            npc.challenge_rating === ratingFilter &&
            npc.dataType === dataFilter
         )
         // Search only
      } else if (
         searchFilter !== '' &&
         ratingFilter === '' &&
         dataFilter === ''
      ) {
         return npc.name.toLowerCase().search(searchFilter.toLowerCase()) !== -1
      }
      // Rating Only
      else if (
         searchFilter === '' &&
         ratingFilter !== '' &&
         dataFilter === ''
      ) {
         return npc.challenge_rating === ratingFilter
      }
      // Data Only
      else if (
         searchFilter === '' &&
         ratingFilter === '' &&
         dataFilter !== ''
      ) {
         return npc.dataType === dataFilter
      }
      // Rating and Data
      else if (
         searchFilter === '' &&
         ratingFilter !== '' &&
         dataFilter !== ''
      ) {
         return (
            npc.dataType === dataFilter && npc.challenge_rating === ratingFilter
         )
      }
      // Search and Data
      else if (
         searchFilter !== '' &&
         ratingFilter === '' &&
         dataFilter !== ''
      ) {
         return (
            npc.dataType === dataFilter &&
            npc.name.toLowerCase().search(searchFilter.toLowerCase()) !== -1
         )
      }
      // Search and Rating
      else if (
         searchFilter !== '' &&
         ratingFilter !== '' &&
         dataFilter === ''
      ) {
         return (
            npc.challenge_rating === ratingFilter &&
            npc.name.toLowerCase().search(searchFilter.toLowerCase()) !== -1
         )
      } else {
         return npc
      }
   })

   return filteredNPCs
}
