/**
 * TemplateController
 *
 * @module      :: Controller
 * @description    :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    /**
     * /template/index
     * Show a list of all the defined templates
     * @param req
     * @param res
     * @returns {*}
     */
    index: function (req, res) {
        Template.find(function (err, templates) {
            if (req.wantsJSON || req.isSocket) {
                return res.json(templates);
            } else {
                return res.view('template/index',
                    {
                        templates: templates
                    });
            }
        });
    },

    preview: function (req, res) {
        Template.findOne({id: req.params.id}).exec(function (err, template) {
            console.log('template previewing: ' + template);
            if (!template) {
                return res.json({err: 'couldn\'t get template'});
            }
            var scale = req.param('scale') ? req.param('scale') : '1.0';
            return res.view('template/preview', {
                rendered: template.handlebarsTemplate,
                scale: req.param('scale') ? req.param('scale') : '1.0',
                layout: 'cardpreview'
            })
        });
    },

    edit: function (req, res) {
        Template.findOne({id: req.params.id}).exec(function (err, template) {
            return res.view('template/create_edit', {
                templateEditing: template
            });
        });
    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to TemplateController)
     */
    _config: {}


};
