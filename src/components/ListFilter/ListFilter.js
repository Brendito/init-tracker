import React, { Component } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import { npcFilter } from '../../utils/utils'
import { challengeRatings } from '../../constants/npcInformation'

export default class ListFilter extends Component {
   handleFilterChange = () => {
      var searchFilter = document
         .getElementById('searchFilter')
         .value.toLowerCase()
      var ratingFilter = document.getElementById('ratingFilter').value
      var dataFilter = this.props.saved
         ? ''
         : document.getElementById('dataFilter').value
      this.props.listener(
         npcFilter(this.props.npcs, searchFilter, ratingFilter, dataFilter)
      )
   }
   render() {
      return (
         <div className="d-flex justify-content-between">
            <FormGroup>
               <Label for="searchFilter" className="font-weight-light">Search</Label>
               <Input
                  id="searchFilter"
                  onChange={this.handleFilterChange}
                  placeholder="NPC Name..."
               />
            </FormGroup>
            <FormGroup>
               <Label for="ratingFilter">CR</Label>
               <Input
                  id="ratingFilter"
                  type="select"
                  onChange={this.handleFilterChange}>
                  <option value="">Any</option>
                  {challengeRatings.map(cr => {
                     return <option key={cr.rating}>{cr.rating}</option>
                  })}
               </Input>
            </FormGroup>
            {!this.props.saved && (
               <FormGroup>
                  <Label for="dataFilter">Source</Label>
                  <Input
                     type="select"
                     id="dataFilter"
                     onChange={this.handleFilterChange}>
                     <option value="">All</option>
                     <option value="SRD">5e SRD</option>
                     <option value="Custom">Custom</option>
                  </Input>
               </FormGroup>
            )}
         </div>
      )
   }
}
