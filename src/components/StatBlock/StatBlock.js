import React, { Component } from 'react'
import { titleCase, getModifier } from '../../utils/utils'
import { savingThrows, skillList, spellList } from '../../utils/statBlockUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles.css'

class StatBlock extends Component {
   constructor(props) {
      super(props)

      this.state = {
         spellList: [],
         sticky: true,
      }
   }

   componentDidMount = () => {
      if (this.props.npc.special_abilities) {
         const arr = [].concat(
            ...this.props.npc.special_abilities.filter(
               ability =>
                  ability.name === 'Spellcasting' ||
                  ability.name === 'Innate Spellcasting'
            )
         )
         if (arr.length > 0) {
            const spells = spellList(arr[0].desc)
            this.setState({ spellList: spells })
         }
      }
   }

   componentWillReceiveProps = () => {
      this.setState({ sticky: true })
   }

   toggleSticky = () => {
      this.setState({
         sticky: !this.state.sticky,
      })
   }

   render() {
      return (
         <div
            className={
               !this.props.modal && this.state.sticky ? 'sticky' : null
            }>
            <div className="d-flex justify-content-start p-2">
               <div
                  className={`stat-block ${
                     this.props.modal ? 'modalview' : 'wide'
                  }`}>
                  <hr className="orange-border" />
                  <div className="section-left">
                     <div className="creature-heading">
                        <h1>{this.props.npc.name}</h1>
                        <h2>
                           {this.props.npc.size}{' '}
                           {this.props.npc.type !== '' &&
                              titleCase(this.props.npc.type)}{' '}
                           - {this.props.npc.alignment}
                        </h2>
                     </div>
                     <svg height="5" width="100%" className="tapered-rule">
                        <polyline points="0,0 400,2.5 0,5" />
                     </svg>
                     <div className="top-stats">
                        <div className="property-line first">
                           <h4>Armor Class:</h4>
                           <p>{this.props.npc.armor_class}</p>
                        </div>
                        <div className="property-line">
                           <h4>Hit Points:</h4>
                           <p>{this.props.npc.hit_points}</p>
                        </div>
                        <div className="property-line last">
                           <h4>Speed:</h4>
                           <p>{this.props.npc.speed}</p>
                        </div>
                        <svg height="5" width="100%" className="tapered-rule">
                           <polyline points="0,0 400,2.5 0,5" />
                        </svg>
                        <div className="abilities">
                           <div className="ability-strength">
                              <h4>STR</h4>
                              <p>
                                 <span className="d-block">
                                    {this.props.npc.strength}
                                 </span>{' '}
                                 (
                                 {this.props.npc.strength &&
                                    getModifier(this.props.npc.strength)}
                                 )
                              </p>
                           </div>
                           <div className="ability-dexterity">
                              <h4>DEX</h4>
                              <p>
                                 <span className="d-block">
                                    {this.props.npc.dexterity}
                                 </span>{' '}
                                 (
                                 {this.props.npc.dexterity &&
                                    getModifier(this.props.npc.dexterity)}
                                 )
                              </p>
                           </div>
                           <div className="ability-constitution">
                              <h4>CON</h4>
                              <p>
                                 <span className="d-block">
                                    {this.props.npc.constitution}
                                 </span>{' '}
                                 (
                                 {this.props.npc.constitution &&
                                    getModifier(this.props.npc.constitution)}
                                 )
                              </p>
                           </div>
                           <div className="ability-intelligence">
                              <h4>INT</h4>
                              <p>
                                 <span className="d-block">
                                    {this.props.npc.intelligence}
                                 </span>{' '}
                                 (
                                 {this.props.npc.intelligence &&
                                    getModifier(this.props.npc.intelligence)}
                                 )
                              </p>
                           </div>
                           <div className="ability-wisdom">
                              <h4>WIS</h4>
                              <p>
                                 <span className="d-block">
                                    {this.props.npc.wisdom}
                                 </span>{' '}
                                 (
                                 {this.props.npc.wisdom &&
                                    getModifier(this.props.npc.wisdom)}
                                 )
                              </p>
                           </div>
                           <div className="ability-charisma">
                              <h4>CHA</h4>
                              <p>
                                 <span className="d-block">
                                    {this.props.npc.charisma}
                                 </span>{' '}
                                 (
                                 {this.props.npc.charisma &&
                                    getModifier(this.props.npc.charisma)}
                                 )
                              </p>
                           </div>
                        </div>
                        <svg height="5" width="100%" className="tapered-rule">
                           <polyline points="0,0 400,2.5 0,5" />
                        </svg>
                        {savingThrows(this.props.npc) !== null && (
                           <div className="property-line first">
                              <h4>Saving Throws:</h4>
                              <p>{savingThrows(this.props.npc)}</p>
                           </div>
                        )}
                        {skillList(this.props.npc) !== null && (
                           <div className="property-line">
                              <h4>Skills:</h4>
                              <p>{skillList(this.props.npc)}</p>
                           </div>
                        )}
                        {this.props.npc.damage_vulnerabilities &&
                           this.props.npc.damage_vulnerabilities !== '' && (
                              <div className="property-line">
                                 <h4>Damage Vulnerabilities:</h4>
                                 <p>{this.props.npc.damage_vulnerabilities}</p>
                              </div>
                           )}
                        {this.props.npc.damage_resistances &&
                           this.props.npc.damage_resistances !== '' && (
                              <div className="property-line">
                                 <h4>Damage Resistances:</h4>
                                 <p>{this.props.npc.damage_resistances}</p>
                              </div>
                           )}
                        {this.props.npc.damage_immunities &&
                           this.props.npc.damage_immunities !== '' && (
                              <div className="property-line">
                                 <h4>Damage Immunities:</h4>
                                 <p>{this.props.npc.damage_immunities}</p>
                              </div>
                           )}
                        {this.props.npc.condition_immunities &&
                           this.props.npc.condition_immunities !== '' && (
                              <div className="property-line">
                                 <h4>Condition Immunities:</h4>
                                 <p>{this.props.npc.condition_immunities}</p>
                              </div>
                           )}
                        {this.props.npc.senses && this.props.npc.senses !== '' && (
                           <div className="property-line">
                              <h4>Senses:</h4>
                              <p>{this.props.npc.senses}</p>
                           </div>
                        )}
                        {this.props.npc.languages &&
                           this.props.npc.languages !== '' && (
                              <div className="property-line">
                                 <h4>Languages:</h4>
                                 <p>{this.props.npc.languages}</p>
                              </div>
                           )}
                        <div className="property-line last">
                           <h4>Challenge</h4>
                           <p>
                              {this.props.npc.challenge_rating} - (
                              {this.props.npc.xp}
                              XP)
                           </p>
                        </div>
                     </div>
                     <svg height="5" width="100%" className="tapered-rule">
                        <polyline points="0,0 400,2.5 0,5" />
                     </svg>

                     {this.props.npc.special_abilities &&
                        this.props.npc.special_abilities.length > 0 && (
                           <div>
                              <div className="special">
                                 <h3>Special Abilities:</h3>
                              </div>
                              {this.props.npc.special_abilities.map(ability => {
                                 if (
                                    (ability.name === 'Spellcasting' ||
                                       ability.name ===
                                          'Innate Spellcasting') &&
                                    this.state.spellList.length > 0
                                 ) {
                                    return (
                                       <div
                                          key={ability.name}
                                          className="property-block">
                                          <h4>{ability.name}</h4>
                                          <p>{this.state.spellList[0]}</p>
                                          <ul className="spellList">
                                             {this.state.spellList.map(
                                                (spell, i) => {
                                                   if (i !== 0) {
                                                      return (
                                                         <li key={spell}>
                                                            <span className="spellGroup">
                                                               {
                                                                  spell.match(
                                                                     /^(.*?:)/g
                                                                  )[0]
                                                               }
                                                            </span>
                                                            {
                                                               spell.match(
                                                                  /([^:]*$)/g
                                                               )[0]
                                                            }
                                                         </li>
                                                      )
                                                   } else {
                                                      return null
                                                   }
                                                }
                                             )}
                                          </ul>
                                       </div>
                                    )
                                 } else {
                                    return (
                                       <div
                                          key={ability.name}
                                          className="property-block">
                                          <h4>{ability.name}</h4>
                                          <p>{ability.desc}</p>
                                       </div>
                                    )
                                 }
                              })}
                           </div>
                        )}
                     {this.props.npc.legendary_actions &&
                        this.props.npc.legendary_actions.length > 0 && (
                           <div className="actions">
                              <h3>Legendary Actions</h3>
                              {this.props.npc.legendary_actions.map(action => {
                                 return (
                                    <div
                                       key={action.name}
                                       className="property-block">
                                       <h4>{action.name}</h4>
                                       <p>{action.desc}</p>
                                    </div>
                                 )
                              })}
                           </div>
                        )}
                  </div>
                  <div className="section-right">
                     {this.props.npc.actions &&
                        this.props.npc.actions.length > 0 && (
                           <div className="actions">
                              <h3>Actions</h3>
                              {this.props.npc.actions.map(action => {
                                 return (
                                    <div
                                       key={action.name}
                                       className="property-block">
                                       <h4>{action.name}</h4>
                                       <p>
                                          {action.desc}
                                          {action.attack_bonus && (
                                             <span>
                                                : +{action.attack_bonus} to hit
                                             </span>
                                          )}
                                          {action.range && (
                                             <span>
                                                , reach {action.range}.
                                             </span>
                                          )}
                                          {(action.average_damage ||
                                             action.damage_dice ||
                                             action.damage_type) && (
                                             <span className="ml-1 mr-1">
                                                Hit:
                                             </span>
                                          )}
                                          {action.average_damage && (
                                             <span>
                                                {action.average_damage}
                                             </span>
                                          )}
                                          {action.damage_dice && (
                                             <span>
                                                {' '}
                                                ({action.damage_dice})
                                             </span>
                                          )}
                                          {action.damage_type && (
                                             <span> {action.damage_type}</span>
                                          )}
                                          {(action.average_damage_bonus ||
                                             action.bonus_damage_dice ||
                                             action.bonus_damage_type) && (
                                             <span> plus </span>
                                          )}
                                          {action.average_damage_bonus && (
                                             <span>
                                                {action.average_damage_bonus}
                                             </span>
                                          )}
                                          {action.bonus_damage_dice && (
                                             <span>
                                                {' '}
                                                ({
                                                   action.bonus_damage_dice
                                                }){' '}
                                             </span>
                                          )}
                                          {action.bonus_damage_type && (
                                             <span>
                                                {' '}
                                                {action.bonus_damage_type}{' '}
                                             </span>
                                          )}
                                       </p>
                                    </div>
                                 )
                              })}
                           </div>
                        )}
                  </div>
                  <hr className="orange-border bottom" />
               </div>
               {!this.props.modal && (
                  <FontAwesomeIcon
                     icon="thumbtack"
                     className="mt-3"
                     color={this.state.sticky ? 'blue' : 'darkgrey'}
                     onClick={this.toggleSticky}
                  />
               )}
            </div>
         </div>
      )
   }
}

export default StatBlock
