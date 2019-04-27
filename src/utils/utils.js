/* eslint-disable no-useless-escape */
import * as types from '../constants/formGroupTypes'
import { modifiers } from '../constants/npcInformation'
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

export function slugify(string) {
   const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;'
   const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------'
   const p = new RegExp(a.split('').join('|'), 'g')

   return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
}

export function titleCase(str) {
   if (str) {
      return str
         .toLowerCase()
         .split(' ')
         .map(function(word) {
            return word.replace(word[0], word[0].toUpperCase())
         })
         .join(' ')
   }
}

export function sentenceCase(str) {
   str = str.toLowerCase().split(' ');
   for (var i = 0; i < str.length; i++) {
     str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
   }
   return str.join(' ');
 }

export function getModifier(value) {
   if (value >= 30) return '+10'
   if (value <= 0) return '-5'
   const num = modifiers.find(npc => Number(npc.value) === Number(value))
   if (num.mod >= 0) {
      return `+${num.mod}`
   } else {
      return num.mod
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
