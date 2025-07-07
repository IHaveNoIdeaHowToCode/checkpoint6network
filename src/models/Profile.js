export class Profile {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.coverImg = data.coverImg
    this.picture = data.picture
    this.bio = data.bio
    this.github = data.github
    this.linkedin = data.linkedin
    this.class = data.class
    this.graduated = data.graduated
  }
}