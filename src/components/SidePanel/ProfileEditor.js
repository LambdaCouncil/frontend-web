import React, {Component} from 'react';
import AvatarEditor from "react-avatar-editor";

class ProfileEditor extends Component {
  render({ image }) {
    return (
      <AvatarEditor
        image={image}
        width={120}
        height={120}
        border={50}
        scale={1.2}
      />
    );
  }
}

export default ProfileEditor;