/* bender-tags: inlinetoolbar,context */
/* bender-ckeditor-plugins: inlinetoolbar */
/* bender-include: _helpers/tools.js */
/* global contextTools */

( function() {
	'use strict';

	bender.editor = {
		config: {
			// We're using various weird markup combinations, thus disabling ACF filtering.
			allowedContent: true
		}
	};

	bender.test( {
		setUp: function() {
			if ( CKEDITOR.env.ie && CKEDITOR.env.version === 8 ) {
				assert.ignore();
			}
		},

		tearDown: function() {
			this.editor.balloonToolbar._manager._clear();
		},

		'test falsy matching': function() {
			var context = this._getContextStub( 'video' );

			this.editorBot.setHtmlWithSelection( '<p><strong>foo^ bar</strong></p>' );

			contextTools._assertToolbarVisible( false, context );
		},

		'test falsy matching multiple': function() {
			var context = this._getContextStub( 'video, audio, aside' );

			this.editorBot.setHtmlWithSelection( '<p><strong>foo^ bar</strong></p>' );

			contextTools._assertToolbarVisible( false, context );
		},

		'test correct matching': function() {
			var context = this._getContextStub( 'strong' );

			this.editorBot.setHtmlWithSelection( '<p><strong>foo^ bar</strong></p>' );

			contextTools._assertToolbarVisible( true, context );
		},

		'test correct matching multiple': function() {
			var context = this._getContextStub( 'em, strong, s' );

			this.editorBot.setHtmlWithSelection( '<p><strong>foo^ bar</strong></p>' );

			contextTools._assertToolbarVisible( true, context );
		},

		'test matching by attribute': function() {
			var context = this._getContextStub( 'strong[data-foo-bar]' );

			this.editorBot.setHtmlWithSelection( '<p><strong data-foo-bar="1">foo^ bar</strong></p>' );

			contextTools._assertToolbarVisible( true, context );
		},

		'test matching by class': function() {
			var context = this._getContextStub( 'em.item' );

			this.editorBot.setHtmlWithSelection( '<p><em class="multi item class">foo^ bar</em></p>' );

			contextTools._assertToolbarVisible( true, context );
		},

		'test reject by attribute': function() {
			var context = this._getContextStub( 'strong:not([data-foo-bar])' );

			this.editorBot.setHtmlWithSelection( '<p><strong data-foo-bar="1">foo^ bar</strong></p>' );

			contextTools._assertToolbarVisible( false, context );
		},

		'test reject by class': function() {
			var context = this._getContextStub( 'em:not(.multi)' );

			this.editorBot.setHtmlWithSelection( '<p><em class="multi item class">foo^ bar</em></p>' );

			contextTools._assertToolbarVisible( false, context );
		},

		/*
		 * @param {String} selector A selector to be used as `options.elements`.
		 * @returns {CKEDITOR.plugins.balloontoolbar.context} Context instance with `selector` used as a CSS selector.
		 */
		_getContextStub: function( selector ) {
			return this.editor.balloonToolbar.create( {
				cssSelector: selector
			} );
		}
	} );
} )();
