describe('Grinder', function() {
  var grind;
  var callbackFunction = function(params) {
    return params;
  }

  beforeEach(function() {
    window.location.hash = '';
    grind = new Grinder(callbackFunction);
  });

  describe('.update()', function() {

    it('should add key when key is nonexistent', function() {
      grind.update('character', 'nemo');

      expect(window.location.hash).toEqual('#?character=nemo');
    });

    it('should append key when hash is not blank', function() {
      window.location.hash = '#?location=dentist';
      grind.update('character', 'nemo', false, true);

      expect(window.location.hash).toEqual('#?location=dentist&character=nemo');
    });

    it('should append key when hash is not blank and the first key\'s value has multiple attributes', function() {
      window.location.hash = '#?location=eac,dentist';
      grind.update('character', 'nemo');

      expect(window.location.hash).toEqual('#?location=eac,dentist&character=nemo');
    });


    describe('key_is_required=false&should_replace_value=true', function() {

      it('should remove key when value is blank', function() {
        window.location.hash = '#?character=nemo';
        grind.update('character', '', false, true);

        expect(window.location.hash).toEqual('');
      });

      it('should remove value when value has two attributes and value is first', function() {
        window.location.hash = '#?character=nemo,marlin';
        grind.update('character', 'nemo', false, true);

        expect(window.location.hash).toEqual('#?character=marlin');
      });

      it('should remove value when value has two attributes and value is last', function() {
        window.location.hash = '#?character=marlin,nemo';
        grind.update('character', 'nemo', false, true);

        expect(window.location.hash).toEqual('#?character=marlin');
      });

      it('should remove value when value has multiple attributes and value is first', function() {
        window.location.hash = '#?character=nemo,marlin,dory';
        grind.update('character', 'nemo', false, true);

        expect(window.location.hash).toEqual('#?character=marlin,dory');
      });

      it('should remove value when value has multiple attributes and value is in the middle', function() {
        window.location.hash = '#?character=marlin,nemo,dory';
        grind.update('character', 'nemo', false, true);

        expect(window.location.hash).toEqual('#?character=marlin,dory');
      });

      it('should remove value when value has multiple attributes and value is at the end', function() {
        window.location.hash = '#?character=marlin,dory,nemo';
        grind.update('character', 'nemo', false, true);

        expect(window.location.hash).toEqual('#?character=marlin,dory');
      });

      describe('has preceeding key', function() {

        it('should remove key when value is blank', function() {
          window.location.hash = '#?location=eac&character=nemo';
          grind.update('character', '', false, true);

          expect(window.location.hash).toEqual('#?location=eac');
        });

        it('should remove value when value has two attributes and value is first', function() {
          window.location.hash = '#?location=eac&character=nemo,marlin';
          grind.update('character', 'nemo', false, true);

          expect(window.location.hash).toEqual('#?location=eac&character=marlin');
        });

        it('should remove value when value has two attributes and value is last', function() {
          window.location.hash = '#?location=eac&character=marlin,nemo';
          grind.update('character', 'nemo', false, true);

          expect(window.location.hash).toEqual('#?location=eac&character=marlin');
        });

        it('should remove value when value has multiple attributes and value is first', function() {
          window.location.hash = '#?location=eac&character=nemo,marlin,dory';
          grind.update('character', 'nemo', false, true);

          expect(window.location.hash).toEqual('#?location=eac&character=marlin,dory');
        });

        it('should remove value when value has multiple attributes and value is in the middle', function() {
          window.location.hash = '#?location=eac&character=marlin,nemo,dory';
          grind.update('character', 'nemo', false, true);

          expect(window.location.hash).toEqual('#?location=eac&character=marlin,dory');
        });

        it('should remove value when value has multiple attributes and value is at the end', function() {
          window.location.hash = '#?location=eac&character=marlin,dory,nemo';
          grind.update('character', 'nemo', false, true);

          expect(window.location.hash).toEqual('#?location=eac&character=marlin,dory');
        });

      });

      describe('has trailing key', function() {

        it('should remove key when value is blank', function() {
          window.location.hash = '#?character=nemo&location=eac';
          grind.update('character', '', false, true);

          expect(window.location.hash).toEqual('#?location=eac');
        });

        it('should remove value when value has two attributes and value is first', function() {
          window.location.hash = '#?character=nemo,marlin&location=eac';
          grind.update('character', 'nemo', false, true);

          expect(window.location.hash).toEqual('#?character=marlin&location=eac');
        });

        it('should remove value when value has two attributes and value is last', function() {
          window.location.hash = '#?character=marlin,nemo&location=eac';
          grind.update('character', 'nemo', false, true);

          expect(window.location.hash).toEqual('#?character=marlin&location=eac');
        });

        it('should remove value when value has multiple attributes and value is first', function() {
          window.location.hash = '#?character=nemo,marlin,dory&location=eac';
          grind.update('character', 'nemo', false, true);

          expect(window.location.hash).toEqual('#?character=marlin,dory&location=eac');
        });

        it('should remove value when value has multiple attributes and value is in the middle', function() {
          window.location.hash = '#?character=marlin,nemo,dory&location=eac';
          grind.update('character', 'nemo', false, true);

          expect(window.location.hash).toEqual('#?character=marlin,dory&location=eac');
        });

        it('should remove value when value has multiple attributes and value is at the end', function() {
          window.location.hash = '#?character=marlin,dory,nemo&location=eac';
          grind.update('character', 'nemo', false, true);

          expect(window.location.hash).toEqual('#?character=marlin,dory&location=eac');
        });

      });

    });

    describe('key_is_required=true&should_replace_value=true', function() {

      it('should keep key when value is blank', function() {
        window.location.hash = '#?character=nemo';
        grind.update('character', '', true, true);

        expect(window.location.hash).toEqual('#?character=');
      });

    });

    describe('key_is_required=false&should_replace_value=false', function() {

      it('should add key when key is nonexistent', function() {
        grind.update('character', 'nemo', false, false);

        expect(window.location.hash).toEqual('#?character=nemo');
      });

      it('should add value when value is existent', function() {
        window.location.hash = '#?character=marlin';
        grind.update('character', 'nemo', false, false);

        expect(window.location.hash).toEqual('#?character=marlin,nemo');
      });

    });

  });

  describe('.parse()', function() {

    it('should return hash as a key/value JSON object', function() {
      window.location.hash = '#?character=nemo&location=eac';

      var params = grind.parse();

      expect(params).toEqual({ 'character' : 'nemo', 'location' : 'eac'});
    });

  });

  describe('.param()', function() {

    it('should return the value of a param given a key', function() {
      window.location.hash = '#?character=nemo';

      expect(grind.param('character')).toEqual('nemo');
    });

  });

  describe('.paramPresent()', function() {

    it('should return true for an existent param given a key', function() {
      window.location.hash = '#?character=nemo';

      grind.parse();

      expect(grind.paramPresent('character')).toEqual(true);
    });

    it('should return false for an existent param given a key', function() {
      window.location.hash = '#?character=nemo';

      grind.parse();

      expect(grind.paramPresent('location')).toEqual(false);
    });

  });

  describe('.params', function() {

    it('should return single-value params', function() {
      window.location.hash = '#?character=nemo&location=eac';

      grind.parse()

      expect(grind.params).toEqual({'character' : 'nemo', 'location' : 'eac'});
    });

    it('should return multiple-value params', function() {
      window.location.hash = '#?character=nemo,marlin,dory&location=eac';

      grind.parse()

      expect(grind.params).toEqual({'character' : 'nemo,marlin,dory', 'location' : 'eac'});
    });

  });


});
