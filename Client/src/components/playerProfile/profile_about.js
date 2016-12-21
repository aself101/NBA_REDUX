import React from 'react';


const ProfileAbout = ({ player }) => {
  if (!player) return <span></span>;
  return (
    <div className="box box-primary">
      <div className="box-header with-border">
        <h3 className="box-title">About Player</h3>
      </div>

      <div className="box-body">
        <strong><i className="fa fa-book margin-r-5"></i> College / HighSchool</strong>
        <p className="text-muted">{ player.school }</p>
        <hr />

        <strong><i className="fa fa-map-marker margin-r-5"></i> Draft Year</strong>
        <p className="text-muted">{ player.draftYear }</p>
        <hr />

        <strong><i className="fa fa-certificate margin-r-5"></i> Draft Pick</strong>
        <p className="text-muted">{ player.draftNumber }</p>
        <hr />

        <strong><i className="fa fa-male margin-r-5"></i> Height - Weight</strong>
        <p className="text-muted">{ player.height } - { player.weight }</p>

        <hr />
        <strong><i className="fa fa-shirtsinbulk margin-r-5"></i> Jersey</strong>
        <p className="text-muted">{ player.jersey }</p>
        <hr />


      </div>
    </div>
  );
};


export default ProfileAbout;
