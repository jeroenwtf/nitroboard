import { Controller } from "@hotwired/stimulus"
import { template } from 'lodash'
import Fuse from 'fuse.js'
import linksList from '../utils/links'

const fuseOptions = {
  includeScore: true,
  keys: ['title', 'url']
}

const fuse = new Fuse(linksList, fuseOptions)

export default class extends Controller {
  static classes = ["active"]
  static targets = ["input", "hint", "results", "resultsList", "resultsListItem", "searchText", "noResults", "resultLinkTemplate"]

  connect() {
    this.resultLinkTemplate = template(this.resultLinkTemplateTarget.innerHTML)
    this.currentResultIndex = -1
  }

  showResults() {
    this.currentResultIndex = -1

    this.hintTarget.innerText = `Press enter to Google "${this.inputTarget.value}".`

    if (this.inputTarget.value) {
      this.updateCopies(this.inputTarget.value)
      this.resultsTarget.classList.remove('hidden')

      let results = this.fuseSearch(this.inputTarget.value)

      this.resultsListTarget.innerHTML = ''

      if (results.length == 0) {
        this.noResultsTarget.classList.remove('hidden')
      } else {
        this.noResultsTarget.classList.add('hidden')
        results.forEach(result => {
          console.log(result)
          const linkData = {
            title: result.item.title,
            url: result.item.url
          }
          this.resultsListTarget.insertAdjacentHTML('beforeend', this.resultLinkTemplate(linkData))
        })
      }
    } else {
      this.hideResults()
    }
  }

  hideResults() {
    this.resultsTarget.classList.add('hidden')
  }

  updateCopies(text) {
    this.searchTextTargets.forEach(element => {
      element.innerText = text;
    })
  }

  fuseSearch(text) {
    const result = fuse.search(text)

    return result;
  }

  navigate(event) {
    const allowedKeys = ['ArrowUp', 'ArrowDown', 'Enter']

    if (!allowedKeys.includes(event.key) || this.inputTarget.value == '') {
      console.log('nothing happens')
      return;
    }

    event.preventDefault()

    switch (event.key) {
      case 'ArrowUp':
        this.selectPreviousResult()
        break
      case 'ArrowDown':
        this.selectNextResult()
        break
      case 'Enter':
        let url;

        if (this.currentResultIndex == -1) {
          const urlEncodedText = encodeURIComponent(this.inputTarget.value)
          url = `https://www.google.com/search?q=${urlEncodedText}`
        } else {
          url = linksList[this.currentResultIndex].url
        }

        window.location = url;
        break
    }

  }

  selectActiveResult() {
    this.resultsListItemTargets.forEach((element, index) => {
      this.activeClasses.forEach(activeClass => {
        element.classList.toggle(activeClass, index == this.currentResultIndex)
      })
    })

    this.hintTarget.innerText = `Press enter to open ${linksList[this.currentResultIndex].title}.`
  }

  selectNextResult() {
    if (this.currentResultIndex < this.resultsListItemTargets.length - 1) {
      this.currentResultIndex++
      this.selectActiveResult()
    }
  }

  selectPreviousResult() {
    if (this.currentResultIndex > 0) {
      this.currentResultIndex--
      this.selectActiveResult()
    }
  }
}
