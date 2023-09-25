import '../../assets/css/component/avatar_input.css'

const AvatarInput = ({ image }: { image: string }) => {
  return (
    <div className="personal-image">
      <label className="label">
        <input type="file" accept="image/*" />
        <figure className="personal-figure">
          {image !== 'null' && <img src={image} className="personal-avatar" alt="avatar" />}
          <figcaption className="personal-figcaption">
            <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" alt="camera" />
          </figcaption>
        </figure>
      </label>
    </div>
  )
}

export default AvatarInput;
