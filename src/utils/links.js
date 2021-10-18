import linksFile from '../../site/_data/links.json'

function linkList() {
  const links = []

  linksFile.highlighted.forEach(highlightedLink => {
    links.push(highlightedLink)
  })

  linksFile.sections.forEach(section => {
    section.links.forEach(link => {
      links.push(link)
    })
  })

  return links
}

export default linkList()
