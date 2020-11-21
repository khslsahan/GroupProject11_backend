const {
    createverifyElder,
    getverifyElderByElderID,
    getverifyElder,
    updateverifyElder,
    deleteverifyElder
} = require("./verify_elder.service");

const { checkPermision } = require("../../auth/roleauth");

module.exports = {
    createverifyElder: (req, res) => {
        const body = req.params.body;
        createverifyElder(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    succsess: 0,
                    message: "Database Connection Error"
                })
            }
            return res.status(200).json({
                succsess: 1,
                data: results
            });
        });
    },
    getverifyElderByElderID: (req, res) => {
        const elder_id = req.params.elder_id;
        getverifyElderByElderID(elder_id, (err,results) =>{
          if (err){
            console.log(err);
            return ;
          }
          if(!results){
              return res.json({
                success:0,
                message:"Record not found"
              });
          }
          return res.json({
            success:1,
            data:results
    
          });
        });
    },
    getverifyElder: (req, res) => {
    
        const rcid = {
          role_id: req.auth.result.role_id,
          cap_id: 1,
        };
    
        checkPermision(rcid, (err, results) => {
          if (err) {
            console.log(err);
          }
    
          if (!results) {
            return res.json({
              success: 0,
              error: "Unauthorized access",
            });
          }
          getverifyElder((err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            return res.json({
              success: 1,
              data: results,
            });
          });
        });
    },
    updateverifyElder: (req, res) => {
        const body=req.body;
        updateverifyElder(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
    
          return res.json({
            success: 1,
            message: "updated successfully",
          });
        });
    },
    deleteverifyElder: (req, res) => {
        const data = req.body;
        deleteverifyElder(data, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "Record Not Found",
            });
          }
          return res.json({
            success: 1,
            message: "Elder deleted successfully",
          });
        });
    }
}