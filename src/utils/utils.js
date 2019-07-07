/* eslint-disable no-useless-escape */
import { modifiers } from '../constants/npcInformation'

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

export function sortByName(array) {
   const ar = array.sort((a, b) => {
      var nameA = a.name.toUpperCase()
      var nameB = b.name.toUpperCase()
      if (nameA < nameB) {
         return -1
      }
      if (nameA > nameB) {
         return 1
      }
      return 0
   })
   return ar
}

export function sentenceCase(str) {
   str = str.toLowerCase().split(' ')
   for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
   }
   return str.join(' ')
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

// TODO: There has to be a better way to do this, search for library.
export function npcFilter(chars, searchFilter, ratingFilter, dataFilter) {
   const filteredNPCs = chars.filter(npc => {
      // All filtered
      if (searchFilter !== '' && ratingFilter !== '' && dataFilter !== '') {
         return (
            npc.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 &&
            npc.challenge_rating === ratingFilter &&
            npc.dataType === dataFilter
         )
         // Search only
      } else if (
         searchFilter !== '' &&
         ratingFilter === '' &&
         dataFilter === ''
      ) {
         return npc.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1
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
            npc.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1
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
            npc.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1
         )
      } else {
         return npc
      }
   })

   return filteredNPCs
}
